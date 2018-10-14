
require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

Vue.use(VueChatScroll)
Vue.use(Toaster, {timeout: 5000})
Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app',
    data: {
      message: '',
      chat: {
        messages: [],
        user: [],
        color: [],
        time: []
      },
      typing: '',
      numberOfUsers: 0
    },
    methods: {
      send()
      {
        if(this.message.length > 0)
        this.chat.messages.push(this.message)
        this.chat.user.push('yut')
        this.chat.color.push('success')
        this.chat.time.push(this.getTime())

        axios.post('/send', {
          message: this.message,
          chat: this.chat
        })
        .then(response => {
          console.log(response)
          this.message = ''
        })
        .catch(error =>{
          console.log(error);
        })

      },
      getTime()
      {
        let time = new Date();
        return time.getHours() + ':' + time.getMinutes()
      },
      getOldMessages()
      {
        axios.post('/getOldMessage')
        .then(response => {
          console.log(response)
          if(response.data != ''){
            this.chat = response.data;
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      deleteSession()
      {
        axios.post('/deleteSession')
        .then(res => this.$toaster.warning('chat history is deleted'))
      }
    },
    watch:{
      message(){
        Echo.private('chat')
          .whisper('typing', {
              name: this.message
          });
      }
    },
    mounted() {
      console.log('time :', this.getTime())
      Echo.private('chat')
        .listen('ChatEvent', (e) => {
            this.chat.messages.push(this.message)
            this.chat.user.push('tester')
            this.chat.color.push('warning')
            this.chat.time.push(this.getTime())

              axios.post('/saveToSession',{ chat: this.chat})
              .then(response => {
                console.log(response)
              })
              .catch(error => {
                console.log(error)
              })
        })
        .listenForWhisper('typing', (e) => {
            if(e.name != ''){
               this.typing = 'typing...'
            } else {
              this.typing = ''
            }
        });

        Echo.join(`chat`)
          .here((users) => {
            this.numberOfUsers = users.length
            // console.log('user :', users)
          })
          .joining((user) => {
            this.numberOfUsers += 1
            this.$toaster.success(user.name + 'is joned the chat room.')
            // console.log(user.name);
          })
          .leaving((user) => {
            this.numberOfUsers -= 1
            this.$toaster.warning(user.name + 'is leaved the chat room.')
            // console.log(user.name);
          });
    }
});


require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app',
    data: {
      message: '',
      chat: {
        messages: [],
        user: [],
        color: null
      },
      typing: ''
    },
    methods: {
      send(){
        if(this.message.length > 0)
        this.chat.messages.push(this.message)
        this.chat.user.push('yut')
        this.chat.color = 'success'
        axios.post('/send', {
          message: this.message
        })
        .then(response => {
          console.log(response)
          this.message = ''
        })
        .catch(error =>{
          console.log(error);
        });
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
      Echo.private('chat')
        .listen('ChatEvent', (e) => {
            this.chat.messages.push(e.message)
            this.chat.user.push('yut')
            this.chat.color = 'warning'
            console.log('hi :',e);
        })
        .listenForWhisper('typing', (e) => {
            if(e.name != ''){
               this.typing = 'typing...'
            } else {
              this.typing = ''
            }
        });
    }
});

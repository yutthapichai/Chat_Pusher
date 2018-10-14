<template>
  <div>
    <li class="list-group-item" :class="className">
      <slot></slot>
      <small class="badge btn-success float-right" id="time">{{ time }}</small>
    </li>
    <small class=" float-right">{{ user }}</small>
  </div>
</template>

<script>
    export default {
        props: [
          'color',
          'user',
          'time'
        ],
        computed: {
          className(){
            return `list-group-item-${this.color}`
          }
        },
        mounted() {
            console.log('Component mounted from message.')
        }
    }
</script>
<style>
  #time {
    font-size: 8 px;
  }
</style>

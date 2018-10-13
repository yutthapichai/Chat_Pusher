<template>
  <div>
    <li class="list-group-item" :class="className"><slot></slot></li>
    <small class="badge btn-primary float-right">{{ user }}</small>
  </div>
</template>

<script>
    export default {
        props: ['color','user'],
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

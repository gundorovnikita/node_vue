<template>

<div class="chat">
    <RoomList/>

    <ChatField/>


  </div>
</template>

<script>
import RoomList from '@/components/home/RoomList'
import ChatField from '@/components/home/ChatField'

export default {
    components:{
        RoomList,ChatField
    },
    mounted(){
      localStorage.removeItem('messages');
    }
}
</script>

<style scoped>
@import '../css/home.css'
</style>

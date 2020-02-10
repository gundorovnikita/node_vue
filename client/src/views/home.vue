<template>

<div class="chat">
    <RoomList/>

    <ChatField/>
{{$store.getters.getAuth.id}}
  </div>
</template>

<script>
import RoomList from '@/components/home/RoomList'
import ChatField from '@/components/home/ChatField'

export default {
    components:{
        RoomList,ChatField
    },
    updated(){
      alert(this.$store.getters.getAuth.id)
			this.$socket.emit('user-connect',this.$store.getters.getAuth.id);
    }
}
</script>

<style scoped>
@import '../css/home.css'
</style>

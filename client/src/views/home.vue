<template>

<div class="chat">
    <RoomList
      v-bind:users="users"
      v-on:connect-chat="connectChat"
    />

    <ChatField
      v-bind:messages="messages"
      v-bind:connected="connected"
      v-on:send-message="sendMessage"
    />


  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios'
import RoomList from '@/components/RoomList'
import ChatField from '@/components/ChatField'

export default {
    data() {
        return {
            messages: [],
            socket: io('localhost:3000'),
            users:[],
            connected: false,
            user: this.$store.getters.getAuth,
        }
    },
    components:{
        RoomList,ChatField
    },
    methods: {
        sendMessage(message) {
            this.socket.emit('send-chat-message', message,this.connected);
            this.messages.push(message)

        },
        connectChat(id){
            this.socket.emit('user-disconnect',this.connected);
            const authId = this.$store.getters.getAuth.id

            if(authId<id){
              this.connected= `${authId}-${id}`
            }else{
              this.connected= `${id}-${authId}`
            }

            this.messages = []
            this.socket.emit('user-connect',this.connected);
        },

    },
    mounted() {
        this.socket.on('chat-message', (data) => {
            this.messages.push(data)
        });
        this.$store.dispatch('fetchAuth')
        axios.get('http://localhost:8080/api/users/')
            .then(response=>{
              this.users=response.data.usersList
            })

    }
}
</script>

<style scoped>
@import '../css/home.css'
</style>

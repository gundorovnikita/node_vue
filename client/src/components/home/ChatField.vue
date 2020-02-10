<template>
	<div class="field">
      <div class="content" >
        {{$route.query.peers}}
        <div class="message_recieve" v-for="(msg, index) in messages" :key="index">

          message: {{msg.message}}
        </div>

      </div>
      <div class="send_area" v-if="$route.query.peers">
        <form @submit.prevent="sendMessage" id="send-container">
        <input type="text" v-model="message" id="message-input">
        <button type="submit" id="send-button">Send</button>
      </form>
      </div>
    </div>
</template>
<script>
export default{
	data(){
		return{
			message:'',
		}
	},
	sockets:{
		chatMessage:function(data){
			this.$store.dispatch('addMessage',{message:data,room:this.$route.query.peers})
		}
	},
	methods:{
		sendMessage(e){
			e.preventDefault();
			this.$socket.emit('send-chat-message', this.message,this.$route.query.peers)
			this.$socket.emit('send-message',this.message,this.$store.getters.getSendUser)
			this.$store.dispatch('addMessage', {message:this.message,room:this.$route.query.peers})
      this.message = ''
		}
	},
	computed:{
		messages(){
			return this.$store.getters.getMessages(this.$route.query.peers)
		}
	},
	mounted(){
		this.$store.dispatch('showMessages',this.$route.query.peers)
		this.$socket.emit('user-connect',this.$route.query.peers);

	}
}
</script>

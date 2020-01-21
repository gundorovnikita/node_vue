<template>
	<div class="field">
      <div class="content" >
        {{connected}}
        <div class="message_recieve" v-for="(msg, index) in messages" :key="index">
          
          message: {{msg}} 
        </div>
        
      </div>
      <div class="send_area" v-if="connected">
        <form @submit.prevent="sendMessage" id="send-container">
        <input type="text" v-model="message" id="message-input">
        <button type="submit" id="send-button">Send</button>
      </form>
      </div>
    </div>
</template>
<script>
export default{
	props:['messages','connected'],
	data(){
		return{
			message:''
		}
	},
	methods:{
		sendMessage(e){
			e.preventDefault();
			this.$emit('send-message',this.message)
            this.message = ''
		}
	}
}
</script>
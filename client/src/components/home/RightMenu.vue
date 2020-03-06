<template>
<div class="right_menu">


		<div class="room_info">
			<div class="room_info_main">
				<div class="room_text_info">
					<div class="room_name">{{user}}</div>
					<div class="room_date_last_connect">last seen 8:03</div>
				</div>
				<div class="room_settings_buttons">
					<div class="room_settings_button"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="search svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg></div>
					<div class="room_settings_button"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-v" class="ellipsis svg-inline--fa fa-ellipsis-v fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path></svg></div>
				</div>
			</div>
		</div>


		<div id="chat_area" >
			<div class="chat_area_main">
				<div class="message_main" v-for="(msg, index) in messages" :key="index">
        <div class="message_ava"><img src="img/1.jpg"></div>
        <div class="message_structure_main" >
            <div class="message_name">Lorem ipsum</div>
            <div class="message_structure">
              <div class="message_element">{{msg.message}}</div>
              <div class="message_date">8:03</div>
            </div>
        </div>
      </div>
				<div class="empty"></div>
			</div>
		</div>

		<div class="send_area" >
			<div class="send_area_main" v-if="$route.query.peers">
      <div class="clip"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paperclip" class="paperclip svg-inline--fa fa-paperclip fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z"></path></svg></div>
			<form @submit.prevent="sendMessage" id="send-container">
				<div class="text_area"><input type="text" placeholder="Write a message..." v-model="message"></div>
			</form>
      <div class="smiles"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="smile" class="smile svg-inline--fa fa-smile fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"></path></svg></div>
      <div class="voice"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="microphone" class="microphone svg-inline--fa fa-microphone fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z"></path></svg></div>
    </div>
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

			this.$socket.emit('send-chat-message', this.message,this.room)
			this.$socket.emit('send-message',this.message,this.$route.query.peers)
			this.$store.dispatch('addMessage', {message:this.message,room:this.room})
      this.message = ''
		},

	},
	computed:{
		messages: function(){
			return this.$store.getters.getMessages(this.room)
		},
		user: function(){
			return this.$store.getters.getSendUser
		},
		room: function (){
			return `${Math.min(this.$store.getters.getAuth.id,this.$route.query.peers)}-${Math.max(this.$store.getters.getAuth.id,this.$route.query.peers)}`
		},

	},

}
</script>

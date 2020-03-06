<template>
	<div class="left_menu">

			<searchChat @find-user="findUser"/>

		<div data-simplebar class="room_list">
			<div class="rooms">
				<div data-simplebar class="room_list" v-if="!find.length">
				<div class="room_main_element"  v-for="user in users" :key="user.id" @click="connectChat(user.id,user.name)">
					<div class="room_element">
						<div class="room_ava"><img  :src=" 'image/'+user.image" alt=""></div>
					<div class="room_text_block">
						<div class="room_detail_name">{{user.name}}</div>
						<div class="room_detail_preview">Lorem ipsum dolor sit.</div>
						<div class="room_detail_time">8:03</div>
						<div class="room_detail_delete" ><svg @click="deleteFriend(user.id)" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="cross svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></div>
						<div class="room_detail_notification"></div>
					</div>
					</div>
				</div>
				</div>
				<div data-simplebar class="room_list" v-else-if="find.length">
				<div class="find_pointer">
					Found {{find.length}} user
				</div>
				<div class="room_main_element" v-for="user in find" :key="user.id" @click="addChat(user.id)">
					<div class="room_element">
						<div class="room_ava"><img  :src=" 'image/'+user.image" alt=""></div>
					<div class="room_text_block">
						<div class="room_detail_name">{{user.name}}</div>

					</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>


</template>
<script>
import searchChat from '@/components/home/RoomList/searchChat';
	export default{
		components:{
			searchChat
		},
		sockets:{
      getMessage:function(data){
        alert(data)
      }
    },
		data(){
			return{
				find:[],
				connected:false,
			}
		},
		computed:{
			users(){
				return this.$store.getters.listUser
			}
		},
    methods:{
			connectChat(id,name){
					this.$store.dispatch('idSendUser',name)
					this.$socket.emit('user-disconnect',this.connected);

					const authId = this.$store.getters.getAuth.id

					this.connected= `${Math.min(authId,id)}-${Math.max(authId,id)}`
					this.$router.push({query:{peers:id}})
					this.$socket.emit('user-connect',this.connected);
					this.$store.dispatch('showMessages',this.connected)
			},
			deleteFriend:async function(id){
				await fetch(`/api/actionfriend/${id}`,{
					method:'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body:JSON.stringify({beh:2})
				})
				this.$store.dispatch('fetchList')
			},
			findUser(users){
				this.find=users;
			},
			addChat:async function(id){
				await fetch(`/api/actionfriend/${id}`,{
					method:'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body:JSON.stringify({beh:1})
				})
				this.$store.dispatch('fetchList')
			}
    },
		mounted(){

			return this.$store.dispatch('fetchList')
		}

	}
</script>

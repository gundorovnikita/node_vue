<template>
	<div class="rooms">
		<div class="name_room">
		</div>
      <searchChat/>
      <div  class="list_room" >
        <div  class="detail_room" v-for="user in users" :key="user.id" @click="connectChat(user.id)">
          <img  :src=" 'image/'+user.image" class="ava_room" alt="">
          <div class="name_room">{{user.name}}</div>
					<button type="button" @click="deleteFriend(user.id)">delete</button>
        </div>
      </div>
    </div>
</template>
<script>
import searchChat from './RoomList/searchChat.vue'
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

				connected:false,
			}
		},
		computed:{
			users(){
				return this.$store.getters.listUser
			}
		},
    methods:{
			connectChat(id){
					this.$store.dispatch('idSendUser',id)
					this.$socket.emit('user-disconnect',this.connected);

					const authId = this.$store.getters.getAuth.id

					this.connected= `${Math.min(authId,id)}-${Math.max(authId,id)}`

					this.$router.push({query:{peers:this.connected}})
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
			}
    },
		mounted(){
			
			return this.$store.dispatch('fetchList')
		}

	}
</script>

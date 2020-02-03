<template>
	<div class="rooms">
		<div class="name_room">
		</div>
      <searchChat/>
      <div  class="list_room" >
        <div  class="detail_room" v-for="user in users" :key="user.id" @click="connectChat(user.id)">
          <img  :src=" 'image/'+user.image" class="ava_room" alt="">
          <div class="name_room">{{user.name}}</div>
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
		data(){
			return{

				connected:false,
			}
		},
		computed:{
			users(){
				return this.$store.getters.getAuth.rooms
			}
		},
    methods:{
			connectChat(id){
					this.$socket.emit('user-disconnect',this.connected);

					const authId = this.$store.getters.getAuth.id

					if(authId<id){
						this.connected= `${authId}-${id}`
					}else{
						this.connected= `${id}-${authId}`
					}
					this.$router.push({query:{peers:this.connected}})
					this.$socket.emit('user-connect',this.connected);
					this.$store.dispatch('showMessages',this.connected)
			},
    },
		mounted(){
			return this.$store.dispatch('fetchAuth')
		}

	}
</script>

<template>
	<div class="rooms">
      <input type="text" class="isearch">
      <div  class="list_room" >
        <div  class="detail_room" v-for="user in users" :key="user.id" @click="connectChat(user.id)">
          <img  :src=" 'image/'+user.image" class="ava_room" alt="">
          <div class="name_room">{{user.name}}</div>
        </div>
      </div>
    </div>
</template>
<script>
	export default{
		props:['users'],
    methods:{
      connectChat(id){
        this.$emit('connect-chat',id)
      }
    }
	}
</script>
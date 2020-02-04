<template>
  <div class="search">
    <form class="searchForm" v-on:submit.prevent="submitSearch">
      <input type="text" class="isearch" v-model="find" v-on:enter="submitSearch">
    </form>
    <div class="ready" v-for="user of users" v-bind:key="user.id" v-on:click="addFriend(user.id)">
      {{user.name}}
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      find:'',
      users:[],
    }
  },
  watch:{
    find(){
      if(this.find){
        this.submitSearch()
      }else{
        this.users=[]
      }
    }
  },
  methods:{
    submitSearch:async function(){
      const data = await fetch(`/api/findusers?search=${this.find}`)
      const json = await data.json()
      this.users = json
    },
    addFriend:async function(id){
      await fetch(`/api/actionfriend/${id}`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify({beh:1})
      })
      this.$store.dispatch('fetchList')
    }
  }

}
</script>
<style media="screen">
  .ready{
    color: white;
  }
</style>

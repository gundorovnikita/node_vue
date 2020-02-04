<template>
  <div class="search">
    {{find}}
    <form class="searchForm" v-on:submit.prevent="submitSearch">
      <input type="text" class="isearch" v-model="find" v-on:enter="submitSearch">
    </form>
    <div class="findList" v-for="(user,id) of users" v-bind:key="id">
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
      const data = await fetch(`/api/users?search=${this.find}`)
      const json = await data.json()
      this.users = json
    }
  }

}
</script>
<style media="screen">
  .ready{
    color: white;
  }
</style>

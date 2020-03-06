<template>
  <div class="menu">
    <div class="cancel_search" v-if="find">
      <svg v-on:click="cancelSearch" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" class="back svg-inline--fa fa-arrow-left fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
    </div>
    <div class="profile_link" v-else><a href="#"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" class="user svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg></a></div>
    <form class="searchForm" v-on:submit.prevent="submitSearch">
      <div class="search_room"><input type="text" placeholder="Search" v-model="find" v-on:enter="submitSearch"></div>
    </form>
  </div>
</template>
<script>
export default{
  data(){
    return{
      find:'',
    }
  },
  watch:{
    find(){
      if(this.find){
        this.submitSearch()
      }else{
        this.$emit('find-user',0)
      }
    }
  },
  methods:{
    submitSearch:async function(){
      if(this.find){
        const data = await fetch(`/api/findusers?search=${this.find}`)
        const json = await data.json()
        this.$emit('find-user',json)
      }else{
        this.$emit('find-user',0)
      }

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
    },
    cancelSearch:async function(){
      this.find=''
      this.$emit('find-user',0)
    }
  }

}
</script>
<style media="screen">
  .ready{
    color: white;
  }
</style>

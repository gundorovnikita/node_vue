export default{
  actions:{
    async fetchAuth(ctx){
      const data = await fetch('/api/menu/')
      const json = await data.json()
      ctx.commit('updateAuth',json)
    }
  },
  mutations:{
    updateAuth(state,user){
      state.authUser=user
    }
  },
  state:{
    authUser:{},
  },
  getters:{
    getAuth:(state)=>{return state.authUser}
  }
}

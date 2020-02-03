export default{
  actions:{
    async fetchAuth(ctx){
      const data = await fetch('/api/menu/')
      const json = await data.json()
      ctx.commit('updateAuth',json)
    },
    async findUser(ctx,name){
      alert(name)
      const data = await fetch(`/api/users?search=${name}`)
      const json = await data.json()
      ctx.commit('updateFindUser',json)
    }
  },
  mutations:{
    updateAuth(state,user){
      state.authUser=user
    },
    updateFindUser(state,user){
      state.findUser=user
    }
  },
  state:{
    authUser:{},
    findUser:[]
  },
  getters:{
    getAuth:(state)=>{return state.authUser},
    getFind:(state)=>{return state.findUser}
  }
}

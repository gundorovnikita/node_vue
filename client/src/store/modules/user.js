import { stringify  } from 'qs';

export default{
  actions:{
    async fetchAuth(ctx){
      const data = await fetch('/api/menu/')
      const json = await data.json()
      ctx.commit('updateAuth',json)
    },
    async findUser(ctx,name){
      const data = await fetch(`/api/users?search=${name}`)
      const json = await data.json()
      ctx.commit('updateFindUser',json)
    },
    async fetchList(ctx){
      const data = await fetch('/api/menu/')
      const auth = await data.json()
      ctx.commit('updateAuth',auth)
      let sender = auth.rooms.map(e=>e.id)
      const dataList = await fetch(`/api/getusers?${stringify(sender)}`)
      const list = await dataList.json()
      ctx.commit('updateListUser',list)
    },
    async idSendUser(ctx,id){
      ctx.commit('updateIdSendUser',id)
    }
  },
  mutations:{
    updateAuth(state,user){
      state.authUser=user
    },
    updateFindUser(state,user){
      state.findUser=user
    },
    updateListUser(state,users){
      state.listUser=users
    },
    updateIdSendUser(state,user){
      state.sendUser=user
    }
  },
  state:{
    authUser:{},
    findUser:[],
    listUser:[],
    sendUser:''
  },
  getters:{
    getAuth:(state)=>{return state.authUser},
    getFind:(state)=>{return state.findUser},
    listUser:(state)=>{return state.listUser},
    getSendUser:(state)=>{return state.sendUser}
  }
}

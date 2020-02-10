export default{
  actions:{
    async showMessages(ctx,room){
      const data = await fetch(`/api/messages/${room}`)
      const json = await data.json()
      ctx.commit('updateAllMessages',json)
    },
    async addMessage(ctx,data){
      ctx.commit('updateMessage',data)
    }
  },
  mutations:{
    updateAllMessages(state,messages){
      state.messages=messages
    },
    updateMessage(state,message){
      state.messages.push(message)
    }
  },
  state:{
    messages:[],
  },
  getters:{
    getMessages:(state)=>(peers)=>{
      return state.messages.filter(e=>e.room==peers)
    }
  }
}

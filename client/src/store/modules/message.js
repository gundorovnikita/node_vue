export default{
  actions:{
    async showMessages(ctx,room){
      if(localStorage.messages){
        const data = JSON.parse(localStorage.getItem('messages'))
        const value = data.filter(e=>e.room==room)

        ctx.commit('updateAllMessages',value)
      }else{
        ctx.commit('updateAllMessages',[])
      }
    },
    async addMessage(ctx,data){
      let value = JSON.parse(localStorage.getItem('messages')) || []
      value.push({
        message:data.message,
        room:data.room
      })
      localStorage.setItem('messages',JSON.stringify(value))
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
    getMessages(state){
      return state.messages
    }
  }
}

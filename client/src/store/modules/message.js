export default{
  actions:{
    async showMessages(ctx,room){
      if(localStorage.messages){
        const data = await JSON.parse(localStorage.getItem('messages'))
        const value = data.filter(e=>e.room===room)
        if(value){
          ctx.commit('updateAllMessages',value)
        }else{
          const data = await fetch(`/api/messages/${room}`)
          const json = await data.json()

          let value = JSON.parse(localStorage.getItem('messages'))
          if(value.length){
            alert('value')
            value=[...value,...json]
            localStorage.setItem('messages',JSON.stringify(value))
            ctx.commit('updateAllMessages',json)
          }
        }

      }else{
        const data = await fetch(`/api/messages/${room}`)
        const json = await data.json()
        if(json.length){
          localStorage.setItem('messages',JSON.stringify(json))
          ctx.commit('updateAllMessages',json)
        }
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

const models = require('../models')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const path = require('path')


module.exports = {
  menu:(req,res)=>{
  	const authUser = models.users.find(user=>user.id===req.user.id)
  	res.json(authUser)
  },
  findUsers:(req,res)=>{
  	let usersList = models.users.filter(e=>{
  		const regex = new RegExp(`^${req.query.search}`,'gi')
  		return e.name.match(regex)
  	})
  	console.log(req.query.search)
  	res.json(usersList)
  },
  messages:(req,res)=>{
  	const messagesList = models.messages.filter(e=>e.room===req.params.room)
  	res.json(messagesList)
  },
  actionFriend:(req,res)=>{
    const authUser = models.users.find(user=>user.id===req.user.id)
    switch (req.body.beh) {
      case 1:
        let exist = authUser.rooms.find(e=>e.id==req.params.id)
        if(exist){
          return res.json({message:'User exist'})
        }else{
          authUser.rooms.push({id:req.params.id})
          return res.json({message:'success'})
        }
        break;
      case 2:
        authUser.rooms.find((e,index)=>{
          if(e.id==req.params.id){
            authUser.rooms.splice(index,1)
            return res.json({message:'success'})
          }

        })

        break;
    }
  },
  getUsers:(req,res)=>{
    const idLists = Object.values(req.query)
    let usersList=[]
    idLists.forEach(userIndex=>{
      usersList = [...usersList,models.users.find(user=>user.id==userIndex)]
    })
    res.json(usersList)
  }
}

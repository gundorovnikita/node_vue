const models = require('./models')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const path = require('path')
const fs = require('fs');


const menu = (req,res)=>{
	const authUser = models.users.find(user=>user.id===req.user.id)
	res.json(authUser)
}


const findUsers = (req,res)=>{
	let usersList = models.users.filter(e=>{
		const regex = new RegExp(`^${req.query.search}`,'gi')
		return e.name.match(regex)
	})
	console.log(req.query.search)
	res.json(usersList)
}

const uploadImage = (req,res)=>{
	const authUser = models.users.find(user=>user.id===req.user.id)
	if(authUser.image && authUser.image!=='/1.jpg'){
		fs.unlink(path.join(__dirname,'..','..' ,'uploads',authUser.image), function(err) {

  			console.log('error image')

  		})
	}

	authUser.image=req.file.filename
	res.send(true)
}



const messages = function(req,res){
	const messagesList = models.messages.filter(e=>e.room===req.params.room)
	res.json(messagesList)
}

module.exports = {
	login,menu,findUsers,uploadImage,register,logout,token,verify,messages
}

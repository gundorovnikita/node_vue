const models = require('./models')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const path = require('path')
const fs = require('fs');

const login = (req,res)=>{
	const {name,password} = req.body
	if (name && password){
		const user = models.users.find(user=>user.name===name && user.password===password)
		if (user){
			const accesToken = jwt.sign({id:user.id,type:'acces'}, 'process.env.accesTOKEN_SECRET', { expiresIn: '1h' })


			models.refreshTokens = models.refreshTokens.filter(token=>token.id!==user.id)


			const refreshToken = jwt.sign({id:user.id,type:'refresh'}, 'process.env.refreshTOKEN_SECRET')
			models.refreshTokens.push({token:refreshToken,id:user.id})
			//
			req.session.authToken = accesToken
			req.session.refreshToken = refreshToken
			res.send({accesToken,refreshToken})
		}else{
			res.status(400).send('incorrect name or password')
		}
	}else{
		res.status(400).send('invalid value')
	}
}


const menu = (req,res)=>{
	const authUser = models.users.find(user=>user.id===req.user.id)
	res.json(authUser)
}

const getUsers = (req,res)=>{
	const userList = req.query.users
	res.json(userList)
}

const addFriend = (req,res)=>{
	const mainUser = models.users.find(user=>user.id===req.user.id)
	const addUser = req.body.id
	res.json({mainUser,addUser})
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



const register = (req,res)=>{
	const {name,password} = req.body
	if (name&&password){
		const exist = models.users.some(user=>user.name===name)
		if(!exist){
			const user={
				id:models.users.length+1,
				name,
				password,
				rooms:[],
				image:'/1.jpg'
			}
			models.users.push(user)
			return res.send(user)
		}else{
			return res.status(404).json("name exist")
		}
	} else{
		return res.status(404).json("invalid value")
	}

}


const logout = (req,res)=>{
	models.refreshTokens = models.refreshTokens.filter(token=>token.token!==req.session.refreshToken)
	req.session.authToken = ''

	res.sendStatus(204)
}


const token = (req,res)=>{
	const refreshToken = req.session.refreshToken
	if(refreshToken == null){
		res.status(400).send('error token')
	}
	const token = models.refreshTokens.find(token=>token.token===refreshToken)
	if(token){
		const accesToken = jwt.sign({id:token.id,type:'acces'}, 'process.env.accesTOKEN_SECRET', { expiresIn: '15s' })
		res.json(accesToken)
	}else{
		res.status(400).send('invalid token')
	}
}

const verify = function(req,res,next){
	const token = req.session.authToken;
	if(!token){
		return res.status(401).send('Acces denied')
	}

	try{
		const verified = jwt.verify(token, 'process.env.accesTOKEN_SECRET')
		req.user = verified
		next()
	}catch(err){
		res.status(400).send('invalid Token')
	}
}

const messages = function(req,res){
	const messagesList = models.messages.filter(e=>e.room===req.params.room)
	res.json(messagesList)
}

module.exports = {
	login,menu,getUsers,findUsers,uploadImage,register,logout,token,verify,messages,addFriend
}

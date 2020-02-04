const models = require('../models')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const fs = require('fs');

module.exports = {
  login:(req,res)=>{
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
  },
  register:(req,res)=>{
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

  },
  logout:(req,res)=>{
  	models.refreshTokens = models.refreshTokens.filter(token=>token.token!==req.session.refreshToken)
  	req.session.authToken = ''

  	res.sendStatus(204)
  },
  token:(req,res)=>{
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
  },
  verify:function(req,res,next){
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
}

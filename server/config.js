const express = require('express')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')
const session = require('express-session')
const url = require('./app/urls.js')

const app = express()

app.use('/image',express.static('uploads'));

app.use(session({
	secret:'secret',
	name:'sid',
	resave:false,
	saveUninitialized:false,
	cookie:{
		sameSite:true,
	}
}))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(url)


module.exports = app
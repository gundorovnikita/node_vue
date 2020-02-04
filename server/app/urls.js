const express = require('express')
const views = require('./views/app')
const auth = require('./views/auth')
const image = require('./views/images')
const session = require('express-session')
const upload = require('./config/image')

const app = express()

//auth
app.get('/api/verify',auth.verify,(req,res)=>{
	res.send(true)
})
app.post('/api/login',auth.login)
app.post('/api/register',auth.register)
app.delete('/api/logout',auth.logout)
app.post('/api/token',auth.token)


app.post('/api/users/image',auth.verify,upload.single('file'),image.uploadImage)


app.get('/api/menu',auth.verify,views.menu)

app.get('/api/messages/:room',views.messages)

app.get('/api/findusers',views.findUsers)

app.post('/api/actionfriend/:id',auth.verify,views.actionFriend)

app.get('/api/getusers',views.getUsers)



module.exports = app

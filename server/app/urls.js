const express = require('express')
const views = require('./views')
const session = require('express-session')
const upload = require('./config/image')

const app = express()





app.post('/api/login',views.login)


app.get('/api/menu',views.verify,views.menu)


app.get('/api/users',views.users)



app.post('/api/users/image',views.verify,upload.single('file'),views.uploadImage)



app.post('/api/register',views.register)



app.delete('/api/logout',views.logout)


app.post('/api/token',views.token)




app.get('/api/verify',views.verify,(req,res)=>{
	res.send(true)
})


module.exports = app
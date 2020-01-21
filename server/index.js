const app = require('./config')

const server = app.listen(3000,()=>{
	console.log('server has been started on 3000')
})

//chat

const io = require('socket.io')(server)

io.on('connection', socket=>{
	socket.on('user-connect',(room)=>{
		socket.join(room)

	})
	socket.on('user-disconnect',(room)=>{
		socket.leave(room)

	})
	socket.on('send-chat-message',(message,room)=>{

		socket.to(room).broadcast.emit('chat-message',message)
	})
})

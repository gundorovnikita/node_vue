const messages = [

]

const users=[
	{id:1,name:'Alex',password:'123',image:'/1.jpg',rooms:[{id:4,name:'w',password:'w',image:'/1.jpg'},{id:1,name:'Alex',password:'123',image:'/1.jpg'}]},
	{id:2,name:'Nick',password:'123',image:'/1.jpg',rooms:[{id:2,name:'Nick',password:'123',image:'/1.jpg'}]},
	{id:3,name:'Piter',password:'123',image:'/1.jpg',rooms:[{id:4,name:'w',password:'w',image:'/1.jpg'},{id:3,name:'Piter',password:'123',image:'/1.jpg'}]},
	{id:4,name:'w',password:'w',image:'/1.jpg',rooms:[{id:1,name:'Alex',password:'123',image:'/1.jpg'},{id:3,name:'Piter',password:'123',image:'/1.jpg'},{id:4,name:'w',password:'w',image:'/1.jpg'}]}
]

const refreshTokens=[]



module.exports = {
	users,refreshTokens,messages
}

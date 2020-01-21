import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import axios from 'axios'
//import ChatRoom from '@/views/ChatRoom.vue'

Vue.use(Router)

const middleware = (to, from, next) => {
	axios.get('http://localhost:8080/api/verify/')
		.then(response=>{
			if(response.data===true){
				next()
			}else{
				next('/login')
			}
		}).catch(()=>next('/login'))
	
}


export default new Router({
	mode:'history',
	routes:[
		{
			path:'/i',
			name:'home',
			meta: {layout:'main'},
			component:Home,
			beforeEnter: middleware,
//			children:[{
//				query: { plan: 'private' },
//				component:ChatRoom,
//				props:true
//			}]
		},
		{
			path:'/register',
			name:'register',
			meta: {layout:'auth'},
			component: ()=>import('./views/register.vue')
		},
		{
			path:'/login',
			name:'login',
			meta: {layout:'auth'},
			component: ()=>import('./views/login.vue')
		},
		{
			path:'/menu',
			name:'menu',
			meta: {layout:'main'},
			component: ()=>import('./views/menu.vue'),
			beforeEnter: middleware
		
		}
	]
})
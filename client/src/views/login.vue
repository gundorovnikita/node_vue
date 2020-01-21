<template>
	<div>
		<h2>login</h2>
		<form @submit.prevent='onSubmit'>
			<input type="text" v-model='name' placeholder="name">
			<br>
			<input type="password" v-model='password' placeholder="password">
			<br>
			<button type="submit">submit</button>
		</form>
	</div>
</template>
<script>
	import axios from 'axios'
export default{
	data(){
		return{
			name:'',
			password:''
		}
	},
	methods:{
		onSubmit(){
			if(this.name.trim()&&this.password.trim()){
				const loginUser = {
					name:this.name,
					password:this.password
				}
				this.name=''
				this.password=''
				console.log(loginUser)
				axios.post('http://localhost:8080/api/login/',loginUser)
					.then(()=>{
						this.$router.push({name: 'menu'})
					})
					.catch(error=>console.log(error.response.data))
			}
		}
	}
}
</script>
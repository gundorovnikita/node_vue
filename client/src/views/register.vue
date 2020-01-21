<template>
	<div>
		<h2>Register</h2>
		<form @submit.prevent="onSubmit">
			<input type="text" placeholder="name" v-model='name'>
			<br>
			<input type="password" placeholder="password" v-model='password'>
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
			password:'',
		}
	},
	methods:{
		onSubmit(){
			if(this.name.trim()&&this.password.trim()){
				const newUser = {
					name:this.name,
					password:this.password
				}
				this.name=''
				this.password=''

				axios.post('http://localhost:8080/api/register/',newUser)
					.then(response=>console.log(response.data))		
					.catch(error=>console.log(error.response.data))
			}
		}
	}
}
</script>
<template>
	<div>
		<h2>users:</h2>
		<div class="list" v-for="user in users" :key="user.id">
			{{user.name}}
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default{
	data(){
		return{
			users:[],
		}
	},
	mounted(){
		axios.get('http://localhost:8080/api/users/')
			.then(response=>this.users=response.data.users)
	}	
}
</script>
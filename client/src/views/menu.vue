<template>
	<div class="profile">

		<div class="ava">
			<img v-if="user.image" :src=" 'image/'+user.image" alt="">

		</div>
		<div class="name">
			{{user.name}}
		</div>
		<hr>
		<div class="settings">
			<div class="setting_button">
				<input type="file" ref='file' @change="Image">
				<button @click="Upload">upload</button>
				<button v-on:click="Logout">exit</button>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default{
	data(){
		return{
			image:null,
		}
	},
	computed:{
		user(){
			return this.$store.getters.getAuth
		}
	},
	async mounted(){
		this.$store.dispatch('fetchAuth')
	},
	methods:{
		Logout:function(){
			axios.delete('http://localhost:8080/api/logout/')
				.then(()=>this.$router.push('/login'))
		},
		Image:function(){
			this.image=this.$refs.file.files[0]
		},
		Upload:async function(){
			const fd = new FormData();
			fd.append('file',this.image)
			axios.post('http://localhost:8080/api/users/image',fd)
				.then(response=>{
					if(response){
						this.$store.dispatch('fetchAuth')
					}
				})
		},
	},
}
</script>


<style scoped>
@import '../css/profile.css';
</style>

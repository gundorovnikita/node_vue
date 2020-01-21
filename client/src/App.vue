<template>
	<div class="app">
		
	<component :is='layout'/>
</div>
</template>

<script>

	export default{

		computed:{
			layout(){
				return (this.$route.meta.layout || 'empty') +'-layout'
			}
		},

	}
</script>


<style>
@import 'css/main.css';
</style>

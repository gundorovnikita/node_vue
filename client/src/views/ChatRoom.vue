<template>
	<div id="app">
		{{plan}}
	</div>
</template>


<script>
export default{
	props:{
		'plan':{
			type:String,
			required:true
		}
	}
}
</script>
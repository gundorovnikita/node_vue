<template>
<div id="app">
<div class="header">
	<router-link :to="{name:'home'}" class="header_button">chat</router-link>
	<router-link :to="{name:'menu'}" class="header_button">menu</router-link>
</div>
<div class="content">
<router-view/>
</div>
</div>
</template>

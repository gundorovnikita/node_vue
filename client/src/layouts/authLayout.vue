<template>
<div id="app">

<div class="header">
	<router-link :to="{name:'register'}" class="header_button">register</router-link>
	<router-link :to="{name:'login'}" class="header_button">login</router-link>
</div>
<div class="content">
<router-view/>
</div>
</div>
</template>

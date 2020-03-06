<template>

<div class="chat">

<div id="main">

<LeftMenu/>

<RightMenu/>



</div>
</div>

</template>

<script>
import LeftMenu from '@/components/home/LeftMenu'
import RightMenu from '@/components/home/RightMenu'

export default {
    components:{
        LeftMenu,RightMenu
    },
    updated(){
			this.$socket.emit('user-connect',this.$store.getters.getAuth.id);
    }
}
</script>

<style scoped>
@import '../css/main.css';
@import '../css/roomlist.css';
@import '../css/roominfo.css';
@import '../css/menu.css';
@import '../css/form.css';
@import '../css/chatarea.css';
@import '../css/adaptive.css';
@import '../css/settings.css';
</style>

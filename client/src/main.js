import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'localhost:3000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}))



import authLayout from './layouts/authLayout'
import emptyLayout from './layouts/emptyLayout'
import mainLayout from './layouts/mainLayout'

Vue.component('auth-layout',authLayout)
Vue.component('empty-layout',emptyLayout)
Vue.component('main-layout',mainLayout)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')

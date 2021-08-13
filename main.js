import Vue from 'vue'
import App from './App'
import store from './store'
import tui from './common/httpRequest'
import api from './utils/api.js'
import message from './utils/message.js';
Vue.prototype.$http = api
Vue.config.productionTip = false
Vue.prototype.$message = message;

Vue.prototype.tui = tui
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
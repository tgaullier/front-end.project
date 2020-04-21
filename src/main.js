import Vue from 'vue'
import App from '@/App'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

axios.defaults.withCredentials = true
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Plugins
import '@/plugins/composition-api'
import '@/plugins/firebase'
import '@/plugins/font-awesome'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

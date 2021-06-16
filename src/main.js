import Vue from 'vue'
import App from './App.vue'
import imgHotpost from './imgHotpost';
Vue.use(imgHotpost)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

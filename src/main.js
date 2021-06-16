import Vue from 'vue'
import App from './App.vue'
import imgHotpost from 'img-hotpost';
Vue.use(imgHotpost)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { Button, Select } from 'element-ui';
import ElementUI from 'element-ui';
// Vue.use(Button)
// Vue.use(Select)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

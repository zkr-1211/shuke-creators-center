import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'default-passive-events'
// import { Button, Select } from 'element-ui';
import ElementUI from 'element-ui';
import VueCookies from 'vue-cookies';
import PackageInfo from '@/utils/PackageInfo';
import CookieDisableTip from '@/utils/CookieDisableTip';

PackageInfo();
CookieDisableTip();

Vue.use(VueCookies);

Vue.$cookies.config('3d');
// Vue.use(Button)
// Vue.use(Select)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

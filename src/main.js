// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import "./plugins/vant.js";

// Vue 生产提示，没用的，去掉
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// router.beforeEach((to, from, next) => {
//   let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
//   if (userInfo && userInfo.access_token) {
//     next()
//   } else if (to.path === '/login') {
//     next()
//   } else if (to.path === '/register') {
//     next()
//   } else {
//     next('/login')
//   }
// })

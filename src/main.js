// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './plugins/rem.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'//这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './store/store' //引入vuex

Vue.use(VueLazyload)
Vue.config.productionTip = false
/*全局引入*/

Vue.use(VueAwesomeSwiper, /* { default global options } */)

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

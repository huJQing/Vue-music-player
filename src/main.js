import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入axios
import Axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, Axios)

//引入路由模块
import router from './router/router'

//引入vuex
import store from './store/store'

//http转https
Vue.filter('httpToHttps', function (url) {
  if (!url) return '';
  if (url.substring(0, 5) == 'https') return url
  return 'https' + url.slice(4)
});

//数字格式化（加单位）
Vue.filter('numFormat', function (num) {
  if (!num) return '';
  if (num < 10000) return num;
  if (num > 10000000) return (num / 10000000).toFixed(1) + '千万'
  return (num / 10000).toFixed(1) + '万'
});

//数字格式化（加单位）
Vue.filter('timeFormat', function (time) {
  if (time <= 0) {
    return '00:00';
  } else if (time < 10000) {
    return '00:0' + Math.floor(time / 1000);
  } else if (time < 60000) {
    return '00:' + Math.floor(time / 1000);
  } else {
    let second = Math.ceil(time / 1000)
    let minute = (second / 60) < 10 ? '0' + Math.floor(second / 60) : Math.floor(second / 60)
    second = second - minute * 60
    if (second < 10) {
      return minute + ':0' + second
    } else {
      return minute + ':' + second
    }
  }
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

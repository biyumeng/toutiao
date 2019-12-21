import Vue from 'vue'
import App from './App.vue'
import './permission' // 引用权限模块
import router from './router'
import ElementUI from 'element-ui'
import Component from './components'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less' // 引入初始化样式
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // axios赋值给全局属性
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

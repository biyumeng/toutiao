// 处理路由拦截器  导航守卫
import router from '../router'
import progresss from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(function (to, from, next) {
  progresss.start() // 开启进度条
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login') // 跳到登录页面
    }
  }
  next() // 直接放过
})

router.afterEach(() => {
  progresss.done() // 关闭进度条
})

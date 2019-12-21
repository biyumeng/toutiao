// 处理路由拦截器  导航守卫
import router from '../router'

router.beforeEach(function (to, from, next) {
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

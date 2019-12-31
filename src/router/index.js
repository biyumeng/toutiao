import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' // 强制跳转
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Home2
    }, {
      path: 'comment', // 评论管理
      component: () => import('../views/comment')
    }, {
      path: 'material', // 素材管理
      component: () => import('../views/material')
    }, {
      path: 'articles', // 文章列表
      component: () => import('../views/articles')
    }, {
      path: 'publish', // 发表文章
      component: () => import('../views/publish')
    }, {
      path: 'publish/:articleId',
      component: () => import('../views/publish')
    }, {
      path: 'account', // 账户信息
      component: () => import('../views/account')
    }, {
      path: 'picture', // 账户信息
      component: () => import('../views/picture')
    },
    {
      path: '*',
      component: () => import('../views/404')
    }]
  }, {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router

// 导入 VueRouter 包
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import notFound from '@/views/404'

// 在全局范围实力化
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [{
      path: '/',
      name: 'welcome',
      component: Welcome
    }]
  },
  {
    path: '*',
    name: '404',
    component: notFound
  }
  ]
})
router.beforeEach((to, from, next) => {
  const user = window.sessionStorage.getItem('hm_toutiao')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

export default router

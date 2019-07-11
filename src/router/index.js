// 导入 VueRouter 包
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'

// 在全局范围实力化
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      name: 'login', path: '/login', component: Login
    },
    {
      path: '/', name: 'home', component: Home
    },
    {
      name: 'home', path: '/home', component: Home
    }
  ]
})

export default router

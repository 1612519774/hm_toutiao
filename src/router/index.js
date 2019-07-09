// 导入 VueRouter 包
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
// 在全局范围实力化
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      name: 'login', path: '/', component: Login
    },
    {
      name: 'login', path: '/login', component: Login
    }
  ]
})

export default router

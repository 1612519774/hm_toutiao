import Vue from 'vue'
// 导包
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入 VueRouter 包
import VueRouter from 'vue-router'
// 在全局范围注册组件（注册element-ui组件库）
Vue.use(ElementUI)
Vue.use(VueRouter)
const router = new VueRouter({
  routes: []
})

export default router

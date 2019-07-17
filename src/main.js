import App from './App.vue'
import Vue from 'vue'

// 导包
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import components from '@/components'
import axios from '@/api/axios'
// import VueQuillEditor from '../node_modules/vue-quill-editor/dist/vue-quill-editor.js'
// // require styles 引入样式
// import '../node_modules/quill/dist/quill.core.css'
// import '../node_modules/quill/dist/quill.snow.css'
// import '../node_modules/quill/dist/quill.bubble.css'
// 引入公共样式
import '@/styles/index.less'
Vue.use(components)
// Vue.use(VueQuillEditor)
Vue.prototype.axios = axios

// 在全局范围注册组件（注册element-ui组件库）
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

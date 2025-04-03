import Vue from 'vue'
import App from './App.vue'
import router from './router' // 路由配置

new Vue({
    router, // 注入路由
    render: h => h(App)
}).$mount('#app')
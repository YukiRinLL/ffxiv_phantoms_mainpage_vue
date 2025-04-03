import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'    // 主页
import FFXIVWeather from '@/views/FFXIVWeather.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',          // 根路径
            redirect: '/home'   // 自动跳转到/home
        },
        {
            path: '/home',      // 主页路径
            name: 'Home',
            component: Home
        },
        {
            path: '/weather',   // 天气页路径
            name: 'FFXIVWeather',
            component: FFXIVWeather
        }
    ]
})
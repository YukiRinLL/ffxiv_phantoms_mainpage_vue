import { createRouter, createWebHistory } from 'vue-router'
import { routeConfig } from './config'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routeConfig,

    // 统一路由行为配置
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 }
    }
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? `${to.meta.title} | FFXIV` : 'FFXIV'
    next()
})

export default router


export const routeConfig = [
    {
        path: '/',
        redirect: '/home',
        meta: { hidden: true }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: '首页',
            icon: 'home'
        }
    },
    {
        path: '/weather',
        name: 'FFXIVWeather',
        component: () => import('@/views/FFXIVWeather.vue'),
        meta: {
            title: '天气系统',
            icon: 'weather'
        }
    }
]
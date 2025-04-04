import { createRouter, createWebHistory } from 'vue-router'
import { routeConfig } from '@/router/config'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routeConfig
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import { routeConfig } from './config'

const router = createRouter({
    // mode: 'hash',
    history: createWebHistory(process.env.BASE_URL),
    routes: routeConfig
})

export default router
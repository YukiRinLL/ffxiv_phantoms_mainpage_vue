import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import FFXIVWeather from '@/views/FFXIVWeather.vue';
import EmailOperations from '@/views/EmailOperations.vue'; // 新增 EmailOperations 组件

export const routeConfig = [
    {
        path: '/',
        redirect: '/home',
        meta: { hidden: true }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home',
            icon: 'home'
        }
    },
    {
        path: '/weather',
        name: 'Weather',
        component: FFXIVWeather,
        meta: {
            title: 'Weather',
            icon: 'weather'
        }
    },
    {
        path: '/email-operations',
        name: 'EmailOperations',
        component: EmailOperations,
        meta: {
            title: 'EmailOperations',
            icon: 'email-operations'
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routeConfig
});

export default router;
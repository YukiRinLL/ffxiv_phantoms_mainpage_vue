import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import FFXIVWeather from '@/views/FFXIVWeather.vue';
import SendEmail from '@/views/SendEmail.vue'; // 直接导入 SendEmail 组件

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
        path: '/send-email',
        name: 'SendEmail',
        component: SendEmail,
        meta: {
            title: 'SendEmail',
            icon: 'send-email'
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routeConfig
});

export default router;
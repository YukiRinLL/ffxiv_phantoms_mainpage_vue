import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import FFXIVWeather from '@/views/FFXIVWeather.vue';
import EmailOperations from '@/views/EmailOperations.vue';
import UserManagement from '@/views/UserManagement.vue';
import MessageManagement from '@/views/MessageManagement.vue';
import FileManagement from '@/views/FileManagement.vue';

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
    },
    {
        path: '/user-management',
        name: 'UserManagement',
        component: UserManagement,
        meta: {
            title: 'UserManagement',
            icon: 'user-management'
        }
    },
    {
        path: '/message-management',
        name: 'MessageManagement',
        component: MessageManagement,
        meta: {
            title: 'MessageManagement',
            icon: 'message-management'
        }
    },
    {
        path: '/file-management',
        name: 'FileManagement',
        component: FileManagement,
        meta: {
            title: 'FileManagement',
            icon: 'file-management'
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routeConfig
});

export default router;
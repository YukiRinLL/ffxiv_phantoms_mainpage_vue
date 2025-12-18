import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Welcome from '@/views/Welcome.vue';
import FFXIVMobile from '@/views/FFXIVMobile.vue';
import FFXIVWeather from '@/views/FFXIVWeather.vue';
import EmailOperations from '@/views/EmailOperations.vue';
import UserManagement from '@/views/UserManagement.vue';
import MessageManagement from '@/views/MessageManagement.vue';
import FileManagement from '@/views/FileManagement.vue';
import LegacyView from '@/views/legacy/LegacyView.vue';

export const routeConfig = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome,
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
    // {
    //     path: '/email-operations',
    //     name: 'EmailOperations',
    //     component: EmailOperations,
    //     meta: {
    //         title: 'EmailOperations',
    //         icon: 'email-operations'
    //     }
    // },
    // {
    //     path: '/user-management',
    //     name: 'UserManagement',
    //     component: UserManagement,
    //     meta: {
    //         title: 'UserManagement',
    //         icon: 'user-management'
    //     }
    // },
    // {
    //     path: '/message-management',
    //     name: 'MessageManagement',
    //     component: MessageManagement,
    //     meta: {
    //         title: 'MessageManagement',
    //         icon: 'message-management'
    //     }
    // },
    {
        path: '/file-management',
        name: 'FileManagement',
        component: FileManagement,
        meta: {
            title: 'FileManagement',
            icon: 'file-management'
        }
    },
    {
        path: '/mobile',
        name: 'Mobile',
        component: FFXIVMobile,
        meta: {
            title: 'Mobile',
            icon: 'mobile'
        }
    },
    // Legacy pages
    {
        path: '/legacy/qqchat',
        name: 'LegacyQQChat',
        component: LegacyView,
        props: { page: 'QQchat' },
        meta: {
            title: 'QQ Chat',
            icon: 'comment'
        }
    },
    {
        path: '/legacy/recruitment',
        name: 'LegacyRecruitment',
        component: LegacyView,
        props: { page: 'Recruitment' },
        meta: {
            title: 'Recruitment',
            icon: 'users'
        }
    },
    {
        path: '/legacy/editable-table-mobile',
        name: 'LegacyEditableTableMobile',
        component: LegacyView,
        props: { page: 'editableTable-mobile' },
        meta: {
            title: 'Editable Table Mobile',
            icon: 'table'
        }
    },
    {
        path: '/legacy/get-monthly-stats',
        name: 'LegacyGetMonthlyStats',
        component: LegacyView,
        props: { page: 'getMonthlyStats' },
        meta: {
            title: 'Monthly Stats',
            icon: 'chart-line'
        }
    },
    {
        path: '/legacy/guild-member-dynamic',
        name: 'LegacyGuildMemberDynamic',
        component: LegacyView,
        props: { page: 'guild-member-dynamic' },
        meta: {
            title: 'Guild Member Dynamic',
            icon: 'user-friends'
        }
    },
    {
        path: '/legacy/guild-members',
        name: 'LegacyGuildMembers',
        component: LegacyView,
        props: { page: 'guild-members' },
        meta: {
            title: 'Guild Members',
            icon: 'user-group'
        }
    },
    {
        path: '/legacy/profiles',
        name: 'LegacyProfiles',
        component: LegacyView,
        props: { page: 'profiles' },
        meta: {
            title: 'Profiles',
            icon: 'id-card'
        }
    },
    {
        path: '/legacy/visitor-stats',
        name: 'LegacyVisitorStats',
        component: LegacyView,
        props: { page: 'visitor-stats' },
        meta: {
            title: 'Visitor Stats',
            icon: 'chart-bar'
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routeConfig
});

export default router;
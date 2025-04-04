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
            title: 'Home',
            icon: 'home'
        }
    },
    {
        path: '/weather',
        name: 'Weather',
        component: () => import('@/views/FFXIVWeather.vue'),
        meta: {
            title: 'Weather',
            icon: 'weather'
        }
    }
];
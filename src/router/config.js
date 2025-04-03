export const routeConfig = [
    {
        path: '/',
        redirect: '/home',
        meta: { hidden: true }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/weather',
        name: 'Weather',
        component: () => import('@/views/FFXIVWeather.vue')
    }
]
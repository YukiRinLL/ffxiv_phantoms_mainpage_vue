import { routeConfig } from '@/router/config'

export const mainMenu = routeConfig.filter(route =>
    !route.meta?.hidden
).map(route => ({
    name: route.name,
    path: route.path,
    meta: route.meta
}))
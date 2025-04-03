declare module 'vue-router' {
    interface RouteMeta {
        title?: string
        icon?: string
        hidden?: boolean
        requiresAuth?: boolean
    }
}
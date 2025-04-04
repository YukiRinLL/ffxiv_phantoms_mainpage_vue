import router from "@/store";

export const findRouteByPath = (path) => {
    return router.getRoutes().find(r => r.path === path)
}

export const getActiveMenu = () => {
    return router.currentRoute.value.matched
        .filter(r => !r.meta.hidden)
        .map(r => r.name)
}
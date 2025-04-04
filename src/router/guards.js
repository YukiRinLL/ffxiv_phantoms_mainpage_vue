import store from "@/store";

export function setupRouterGuards(router) {
    router.beforeResolve(async (to) => {
        if (to.meta.requiresAuth) {
            await store.dispatch('user/checkAuth')
        }
    })

    router.afterEach(() => {
        // 页面追踪等统一逻辑
    })
}

// 在main.js中调用
// setupRouterGuards(router)
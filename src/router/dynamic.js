export function setupDynamicRoutes(permissions) {
    const dynamicRoutes = generateRoutesBasedOnPermissions(permissions)
    dynamicRoutes.forEach(route => {
        router.addRoute(route)
    })
}

function generateRoutesBasedOnPermissions(perms) {
    // 根据权限生成路由配置
    return []
}
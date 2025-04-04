import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index' // 确保路径正确
import { setupRouterGuards } from './router/guards' // 确保路径正确

const app = createApp(App)

// 在 main.js 中调用 setupRouterGuards
setupRouterGuards(router)

app.use(router).mount('#app')
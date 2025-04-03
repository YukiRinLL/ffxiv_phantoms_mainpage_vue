import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

// 统一注册路由和状态管理
app.use(router)
app.use(store)

app.mount('#app')
setupRouterGuards(router)
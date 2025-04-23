import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { setupRouterGuards } from './router/guards';
import axios from 'axios';
import CloudflareAnalytics from './plugins/cloudflare-analytics';

// 创建 Vue 应用实例
const app = createApp(App);

// 配置 axios 的全局基础 URL
axios.defaults.baseURL = 'https://phantoms-backend.onrender.com';
// axios.defaults.baseURL = 'http://localhost:8080';

// try {
//     axios.defaults.baseURL = 'https://phantoms-backend.onrender.com';
// } catch (error) {
//     console.error('Failed to set axios baseURL:', error);
//     // 如果 URL 无效或网络问题导致解析失败，可以提供一个备用的本地开发环境 URL
//     axios.defaults.baseURL = 'http://localhost:8080';
// }

// 将 axios 挂载到 Vue 实例的全局属性中
app.config.globalProperties.$axios = axios;

// 使用 Cloudflare Analytics 插件
app.use(CloudflareAnalytics);

// 设置路由守卫
setupRouterGuards(router);

// 使用路由并挂载 Vue 应用
app.use(router).mount('#app');
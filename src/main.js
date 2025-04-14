import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { setupRouterGuards } from './router/guards';
import axios from 'axios';

// 创建 Vue 应用实例
const app = createApp(App);

// 配置 axios 的全局基础 URL
// axios.defaults.baseURL = 'https://phantoms-backend.onrender.com';
axios.defaults.baseURL = 'http://localhost:8080';


// 将 axios 挂载到 Vue 实例的全局属性中
app.config.globalProperties.$axios = axios;

// 设置路由守卫
setupRouterGuards(router);

// 使用路由并挂载 Vue 应用
app.use(router).mount('#app');
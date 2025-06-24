<template>
  <div id="app">
    <nav v-if="showNav" class="navbar">
      <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :class="{ active: $route.name === item.name }"
          class="nav-item"
      >
        <i v-if="item.meta.icon" :class="`icon-${item.meta.icon}`"></i>
        <span>{{ item.meta.title }}</span>
      </router-link>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mainMenu } from '@/config/menu'
import '@/assets/styles/global.css'

export default {
  computed: {
    menuItems() {
      return mainMenu;
    },
    showNav() {
      return !this.$route.meta.hidden;
    }
  },
  mounted() {
    // 添加悬浮窗脚本
    const script = document.createElement('script');
    script.src = "https://swzlutsfsivu.ap-southeast-1.clawcloudrun.com/widget.js";
    script.async = true;
    script.dataset.hostId = "1";
    script.dataset.autoReg = "true";
    script.dataset.loginToken = "";
    script.dataset.title = "Contact with admin";
    script.dataset.logo = "https://img.picgo.net/2024/10/18/frame-1-121x121bc5d878c1dd0d5fc.png";
    script.dataset.themeColor = "#262626";
    script.dataset.closeWidth = "48";
    script.dataset.closeHeight = "48";
    script.dataset.openWidth = "380";
    script.dataset.openHeight = "680";
    script.dataset.welcome = "Thanks for supporting Phantoms FC.";
    document.body.appendChild(script);
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.nav-item:hover {
  background-color: #555;
}

.nav-item.active {
  background-color: #a7a7a7;
}

.icon {
  margin-right: 10px;
  font-size: 1.2em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px); /* 添加平滑的位移动画 */
}
</style>

<style>
#VOCECHAT_WIDGET {
  position: fixed;
  bottom: 16px;
  right: 16px;
  border-radius: 8px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  z-index: 9999;
}
</style>
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

export default {
  computed: {
    menuItems() {
      return mainMenu;
    },
    showNav() {
      return !this.$route.meta.hidden;
    }
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
  background-color: #42b983;
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
<template>
  <div id="app">
    <nav v-if="showNav" class="navbar" ref="navbar">
      <!-- 左上角Home按钮 -->
      <div class="nav-left">
        <router-link
            :to="homeMenuItem.path"
            :class="{ active: $route.name === homeMenuItem.name }"
            class="nav-item"
            @click="isMenuOpen = false"
        >
          <i v-if="homeMenuItem.meta.icon" :class="`icon-${homeMenuItem.meta.icon}`"></i>
          <span>{{ homeMenuItem.meta.title }}</span>
        </router-link>
      </div>
      
      <!-- 右上角菜单按钮 -->
      <div class="nav-right">
        <!-- 所有菜单项（除Home外）合并为一个下拉菜单 -->
        <div class="nav-dropdown" @click="toggleAllMenu" ref="allDropdown">
          <div class="nav-item dropdown-toggle">
            <i class="icon-grid"></i>
            <span>Menu</span>
            <i class="icon-chevron-down dropdown-arrow"></i>
          </div>
          <div class="dropdown-menu" :class="{ 'dropdown-open': isAllMenuOpen }">
            <!-- 核心功能菜单项（除Home外） -->
            <div class="dropdown-section">
              <!-- <div class="dropdown-section-title"></div> -->
              <router-link
                  v-for="item in otherCoreMenuItems"
                  :key="item.path"
                  :to="item.path"
                  :class="{ active: $route.name === item.name }"
                  class="dropdown-item"
                  @click="isAllMenuOpen = false; isMenuOpen = false"
              >
                <i v-if="item.meta.icon" :class="`icon-${item.meta.icon}`"></i>
                <span>{{ item.meta.title }}</span>
              </router-link>
            </div>
            
            <!-- Legacy页面菜单项 -->
            <div class="dropdown-section">
              <div class="dropdown-section-title">Legacy Pages</div>
              <router-link
                  v-for="item in legacyMenuItems"
                  :key="item.path"
                  :to="item.path"
                  :class="{ active: $route.name === item.name }"
                  class="dropdown-item"
                  @click="isAllMenuOpen = false; isMenuOpen = false"
              >
                <i v-if="item.meta.icon" :class="`icon-${item.meta.icon}`"></i>
                <span>{{ item.meta.title }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view :navbar-height="navbarHeight" />
    </transition>
  </div>
</template>

<script>
import { mainMenu } from '@/config/menu'
import '@/assets/styles/global.css'

export default {
  data() {
    return {
      isMenuOpen: false,
      isAllMenuOpen: false,
      navbarHeight: 0
    }
  },
  computed: {
    menuItems() {
      return mainMenu;
    },
    // 核心功能菜单项（非Legacy）
    coreMenuItems() {
      return mainMenu.filter(item => !item.path.startsWith('/legacy/'));
    },
    // Home菜单项（通常是路径为'/'的项）
    homeMenuItem() {
      return this.coreMenuItems.find(item => item.path === '/') || this.coreMenuItems[0];
    },
    // 其他核心功能菜单项（除Home外）
    otherCoreMenuItems() {
      return this.coreMenuItems.filter(item => item.path !== '/');
    },
    // Legacy页面菜单项
    legacyMenuItems() {
      return mainMenu.filter(item => item.path.startsWith('/legacy/'));
    },
    showNav() {
      return !this.$route.meta.hidden;
    }
  },
  provide() {
    return {
      navbarHeight: () => this.navbarHeight,
      updateNavbarHeight: this.updateNavbarHeight
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      // 关闭所有下拉菜单
      this.isAllMenuOpen = false;
      // 更新导航栏高度
      this.updateNavbarHeight();
    },
    toggleAllMenu(event) {
      // 阻止事件冒泡，防止触发toggleMenu
      event.stopPropagation();
      this.isAllMenuOpen = !this.isAllMenuOpen;
      // 更新导航栏高度
      this.updateNavbarHeight();
    },
    updateNavbarHeight() {
      if (this.$refs.navbar) {
        this.navbarHeight = this.$refs.navbar.offsetHeight;
      }
    }
  },
  mounted() {
    // 添加悬浮窗脚本
    const script = document.createElement('script');
    script.src = "https://vocechat.zeabur.app/widget.js";
    script.async = true;
    script.dataset.hostId = "2";
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
    
    // 初始计算导航栏高度
    this.updateNavbarHeight();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', this.updateNavbarHeight);
  },
  beforeUnmount() {
    // 移除窗口大小变化监听
    window.removeEventListener('resize', this.updateNavbarHeight);
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
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: height 0.3s ease;
  border-radius: 8px;
}

/* 左侧区域（Home按钮） */
.nav-left {
  display: flex;
  align-items: center;
}

/* 右侧区域（菜单按钮） */
.nav-right {
  display: flex;
  align-items: center;
}

/* 汉堡菜单按钮 */
.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 8px;
}

.toggle-icon {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 3px 0;
  transition: 0.3s;
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  border-radius: 8px;
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

/* 下拉菜单样式 */
.nav-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dropdown-arrow {
  margin-left: 5px;
  font-size: 0.8em;
  transition: transform 0.3s ease;
}

.nav-dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  min-width: 200px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  z-index: 1001;
  margin-top: 5px;
}

.dropdown-open {
  max-height: 1000px; /* 增大高度以确保所有菜单项都能显示 */
  opacity: 1;
}

.dropdown-item {
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  padding: 12px 16px;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.dropdown-item:hover {
  background-color: #555;
}

.dropdown-item.active {
  background-color: #a7a7a7;
}

.dropdown-item i {
  margin-right: 10px;
  font-size: 1.2em;
}

/* 下拉菜单分节样式 */
.dropdown-section {
  margin-bottom: 8px;
}

.dropdown-section:first-child {
  margin-top: 8px;
}

.dropdown-section-title {
  color: #ccc;
  font-size: 0.9em;
  padding: 8px 16px;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }
  
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #333;
    flex-direction: column;
    align-items: stretch;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  
  .nav-menu-open {
    max-height: 1000px; /* 足够容纳所有菜单项和下拉菜单 */
  }
  
  .nav-item {
    justify-content: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  /* 响应式下拉菜单 */
  .nav-dropdown {
    display: block;
    width: 100%;
  }
  
  .dropdown-toggle {
    justify-content: center;
  }
  
  .dropdown-menu {
    position: static;
    width: 100%;
    border-radius: 0;
    box-shadow: none;
    background-color: #444;
  }
  
  .dropdown-item {
    justify-content: center;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  /* 移动端下拉菜单分节样式 */
  .dropdown-section-title {
    justify-content: center;
    text-align: center;
  }
  
  .nav-dropdown:hover .dropdown-arrow {
    transform: none;
  }
  
  .dropdown-open .dropdown-arrow {
    transform: rotate(180deg);
  }
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
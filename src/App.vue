<template>
  <div id="app">
    <nav v-if="showNav">
      <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :class="{ active: $route.name === item.name }"
      >
        <i :class="`icon-${item.meta.icon}`"></i>
        {{ item.meta.title }}
      </router-link>
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { mainMenu } from '@/config/menu'

export default {
  computed: {
    menuItems() {
      return mainMenu
    },
    showNav() {
      return !this.$route.meta.hidden
    }
  }
}
</script>
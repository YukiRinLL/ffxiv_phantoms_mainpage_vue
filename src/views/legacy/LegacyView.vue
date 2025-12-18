<template>
  <div class="legacy-view-container">
    <iframe
      :src="iframeSrc"
      frameborder="0"
      class="legacy-iframe"
      @load="handleIframeLoad"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'LegacyView',
  props: {
    page: {
      type: String,
      required: true
    }
  },
  computed: {
    iframeSrc() {
      // 构建iframe的src路径
      return `/legacy/${this.page}.html`;
    }
  },
  methods: {
    handleIframeLoad() {
      // 可以在这里处理iframe加载完成后的逻辑
      console.log(`${this.page} loaded successfully`);
    }
  }
}
</script>

<style scoped>
.legacy-view-container {
  width: 100%;
  height: calc(100vh - 60px); /* 减去导航栏的高度 */
  overflow: hidden;
  position: relative;
}

.legacy-iframe {
  width: 100%;
  height: 100%;
  border: none;
  overflow: auto;
}
</style>
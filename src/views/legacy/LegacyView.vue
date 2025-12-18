<template>
  <div class="legacy-view-container" :style="{ height: containerHeight }">
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
    },
    navbarHeight: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      localNavbarHeight: this.navbarHeight
    };
  },
  computed: {
    iframeSrc() {
      // 构建iframe的src路径
      return `/legacy/${this.page}.html`;
    },
    containerHeight() {
      // 动态计算容器高度，减去导航栏的实际高度
      return `calc(100vh - ${this.localNavbarHeight}px)`;
    }
  },
  inject: ['updateNavbarHeight'],
  watch: {
    // 监听props变化，更新本地数据
    navbarHeight(newHeight) {
      this.localNavbarHeight = newHeight;
    }
  },
  methods: {
    handleIframeLoad() {
      // 可以在这里处理iframe加载完成后的逻辑
      console.log(`${this.page} loaded successfully`);
      
      // 向iframe中注入自定义滚动条样式
      try {
        const iframe = this.$el.querySelector('.legacy-iframe');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        // 创建样式元素
        const style = iframeDoc.createElement('style');
        style.textContent = `
          /* Custom Scrollbar Styles for iframe */
          ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 5px;
            transition: background 0.3s ease;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          
          ::-webkit-scrollbar-corner {
            background: #f1f1f1;
          }
          
          /* Firefox */
          * {
            scrollbar-width: thin;
            scrollbar-color: #888 #f1f1f1;
          }
        `;
        
        // 添加到iframe文档头部
        iframeDoc.head.appendChild(style);
      } catch (error) {
        console.warn('Failed to inject scrollbar styles into iframe:', error);
      }
    },
    updateNavbarHeight(height) {
      this.localNavbarHeight = height;
    }
  },
  mounted() {
    // 不再需要监听导航栏高度变化事件，改为使用 props 和 inject
  },
  beforeUnmount() {
    // 不再需要移除事件监听
  }
}
</script>

<style scoped>
.legacy-view-container {
  width: 100%;
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
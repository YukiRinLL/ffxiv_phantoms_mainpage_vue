<template>
  <div class="welcome-container" @click="redirectToHome">
    <div class="video-container">
      <!-- 两个iframe交替使用 -->
      <iframe 
        v-if="activeFrame === 1"
        ref="videoFrame1"
        src="//player.bilibili.com/player.html?bvid=BV1T4qhBdE5S&cid=34774060197&autoplay=1&danmaku=0&muted=1&poster=0&controls=0"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        class="bilibili-video"
      ></iframe>
      <iframe 
        v-else
        ref="videoFrame2"
        src="//player.bilibili.com/player.html?bvid=BV1T4qhBdE5S&cid=34774060197&autoplay=1&danmaku=0&muted=1&poster=0&controls=0"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        class="bilibili-video"
      ></iframe>
      <!-- 顶部覆盖层 - 遮挡播放器顶部UI -->
      <div class="video-overlay top-overlay"></div>
      <!-- 底部覆盖层 - 遮挡播放器底部UI -->
      <div class="video-overlay bottom-overlay"></div>
      <!-- 左侧遮罩条 -->
      <div class="video-overlay left-overlay"></div>
      <!-- 右侧遮罩条 -->
      <div class="video-overlay right-overlay"></div>
      <!-- 半透明遮罩层 -->
      <div class="video-mask"></div>
    </div>
    <div class="logo-container">
      <img :src="logoUrl" alt="Logo" class="logo-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {
      logoUrl: require('@/assets/images/LOGO-LETTER.png'),
      activeFrame: 1, // 当前激活的iframe
      replayTimer: null // 定时器
    }
  },
  mounted() {
    // 初始设置自动播放
    this.setupVideoAutoPlay();
    
    // 添加页面可见性变化监听
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    // 添加触摸事件监听，用于移动端播放
    this.$el.addEventListener('touchstart', this.handleTouchStart, { once: true });
    
    // 设置每分钟自动重播
    this.replayTimer = setInterval(() => {
      try {
        // 切换到另一个iframe
        this.activeFrame = this.activeFrame === 1 ? 2 : 1;
        // 延迟后设置新iframe的自动播放
        setTimeout(() => {
          this.setupVideoAutoPlay();
        }, 100);
      } catch (e) {
        console.log('Video replay failed:', e);
      }
    }, 84000); // 60秒
  },
  
  beforeUnmount() {
    // 清理定时器防止内存泄漏
    if (this.replayTimer) {
      clearInterval(this.replayTimer);
    }
    // 移除事件监听器
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.$el.removeEventListener('touchstart', this.handleTouchStart);
  },
  
  methods: {
    handleVisibilityChange() {
      if (!document.hidden) {
        // 页面重新可见时尝试播放视频
        this.setupVideoAutoPlay();
      }
    },
    
    handleTouchStart() {
      // 移动端触摸事件触发时尝试播放视频
      this.setupVideoAutoPlay();
    },
    setupVideoAutoPlay() {
      // 获取当前激活的iframe
      const iframe = this.activeFrame === 1 ? this.$refs.videoFrame1 : this.$refs.videoFrame2;
      if (iframe) {
        // 直接尝试发送播放指令
        const sendPlayCommand = () => {
          try {
            iframe.contentWindow.postMessage('{"method":"play"}', '*');
          } catch (e) {
            console.log('Video autoplay failed:', e);
          }
        };
        
        // 立即尝试播放
        sendPlayCommand();
        
        // 设置iframe加载完成后的播放尝试
        iframe.onload = sendPlayCommand;
        
        // 添加延迟重试机制
        setTimeout(sendPlayCommand, 500);
        setTimeout(sendPlayCommand, 1000);
        setTimeout(sendPlayCommand, 2000);
      }
    },
    redirectToHome() {
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>
.welcome-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  cursor: pointer;
  z-index: 9999;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bilibili-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 56.25vw; /* 16:9比例 */
  min-height: 100vh;
  min-width: 177.78vh; /* 16:9比例的宽高比 */
  transform: translate(-50%, -50%); /* 仅居中，不缩放 */
  z-index: 1;
  pointer-events: none;
}

/* 半透明遮罩层 */
.video-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3); /* 浅白色半透明遮罩 */
  z-index: 2;
  pointer-events: none;
}

.logo-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4; /* 提高层级，确保显示在黑色遮挡栏之上 */
  pointer-events: none; /* 确保点击事件穿透到容器 */
}

.logo-image {
  max-width: 800px;
  max-height: 800px;
  width: 80%;
  height: auto;
  opacity: 0.9;
}

/* 视频覆盖层样式 */
.video-overlay {
  position: absolute;
  background-color: #000;
  z-index: 3; /* 提高层级，确保显示在遮罩层之上 */
  pointer-events: none;
}

/* 顶部覆盖层 - 遮挡播放器顶部的登录提示等UI */
.top-overlay {
  top: 0;
  left: 0;
  right: 0;
  height: 100px; /* 增加高度确保完全遮挡顶部UI */
}

/* 底部覆盖层 - 遮挡播放器底部的进度条等UI */
.bottom-overlay {
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px; /* 增加高度确保完全遮挡底部UI */
}

/* 左侧遮罩条 */
.left-overlay {
  top: 0;
  left: 0;
  width: 30px; /* 窄条宽度 */
  height: 100%; /* 高度为整个容器 */
}

/* 右侧遮罩条 */
.right-overlay {
  top: 0;
  right: 0;
  width: 30px; /* 窄条宽度 */
  height: 100%; /* 高度为整个容器 */
}
</style>
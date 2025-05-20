<template>
  <div class="home container">
    <!-- 顶部横幅 -->
    <div class="banner">
      <img src="@/assets/images/LOGO-LETTER.png" alt="FFXIV Phantoms" class="logo">
      <h1>Welcome to Phantoms' Sphere</h1>
      <p>FFXIV Freecompany and Cross-world Linkshell</p>
    </div>

    <!-- 主要功能导航 -->
    <div class="feature-cards">
      <router-link to="/weather" class="card weather-card">
        <div class="card-icon">
          <i class="xiv weather-fair-chs"></i>
        </div>
        <h3>Weather Forecast</h3>
        <p>Check weather conditions across Eorzea</p>
      </router-link>

      <router-link to="/file-management" class="card">
        <div class="card-icon">
          <i class="xiv file-icon"></i>
        </div>
        <h3>File Management</h3>
        <p>Manage files and folders</p>
      </router-link>

      <div class="card coming-soon">
        <div class="card-icon">
          <i class="xiv item-minion-chs"></i>
        </div>
        <h3>More Features Coming</h3>
        <p>Stay tuned for updates!</p>
      </div>
    </div>

    <!-- 最新公告 -->
    <div class="announcements">
      <h2>Latest News</h2>
      <div class="news-item" v-for="item in announcements" :key="item.title">
        
        <h3>{{ item.title }}</h3>
        <div class="news-content">
          <p>{{ item.content }}</p>
        </div>
        <span class="date">{{ item.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      announcements: [
        {
          title: '部队主页维护完成',
          content: '[目前维护的FC主页地址]\n'
          +'ffxiv-phantoms-main-page.vercel.app\n'
          +'ffxiv-phantoms-mainpage.onrender.com\n'
          +'ffxiv-phantoms-mainpage.pages.dev\n'
          +'yukirinll.github.io/FFXIV_Phantoms_MainPage\n'

          +'[停用的地址]\n'
          +'yukirinll.gitee.io/ffxiv_phantoms_mainpage\n'
          +'由于网络运营商和地区原因，不一定都访问迅速',
          date: '2025-04-03'
        },
        {
          title: 'Wallpaper Engine 壁纸文件已上传 Steam 创意工坊',
          content: '[链接]\n'
          +'https://steamcommunity.com/sharedfiles/filedetails/?id=3272715540\n'
          +'https://steamcommunity.com/sharedfiles/filedetails/?id=3272725659',
          date: '2024-10-14'
        },
        {
          title: '语音频道施工完成',
          content: '新的语音频道：\n       https://oopz.cn/i/9XgUt9\n'
          +'原来的仍然在用：\n       https://kook.vip/MnyX2V',
          date: '2024-07-17'
        },
        {
          title: '聊天机器人 FFXIVbot 已部署',
          content: 'FFXIVbot 已部署，TX管控原因Image和hso指令已关闭。部分定制化功能（獭逃、占卜、抽卡）未开放。',
          date: '2022-10-18'
        }
      ]
    };
  }
};
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.banner {
  position: relative;
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 40px;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(220, 220, 220, 0.5)),
    url('@/assets/images/logo -no tital.jpg'),
    rgba(255, 255, 255, 1);
  background-size: auto 100%; /* 宽高设置*/
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat; /* 图片不重复 */
  height: 200px; /* 设置容器高度 */
  border-radius: 8px;
  color: #333;
}

.banner .logo {
  height: 80px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.card {
  padding: 25px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  text-align: center;
  color: inherit;
  text-decoration: none;
}

.weather-card {
  background: linear-gradient(135deg, #4f4f4f, #2e2e2e);
  color: white;
}

.card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.announcements {
  background: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.news-item {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.news-item:last-child {
  border-bottom: none;
}

.news-content {
  white-space: pre-wrap; /* 保留换行符 */
  display: inline-block; /* 使容器宽度适应内容 */
  text-align: left; /* 内容左对齐 */
  max-width: 80%; /* 限制最大宽度，可根据需要调整 */
  margin: 0 auto; /* 水平居中 */
}

.date {
  display: block;
  color: #666;
  font-size: 0.9em;
  margin-top: 5px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .banner {
    padding: 30px 15px;
  }

  .feature-cards {
    grid-template-columns: 1fr;
  }
}
</style>
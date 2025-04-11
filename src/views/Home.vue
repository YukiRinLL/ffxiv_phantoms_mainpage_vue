<template>
  <div class="home">
    <!-- 顶部横幅 -->
    <div class="banner">
      <img src="@/assets/images/LOGO-LETTER.png" alt="FFXIV Phantoms" class="logo">
      <h1>Welcome to FFXIV Phantoms</h1>
      <p>Your companion for Eorzean adventures</p>
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
        <p>{{ item.content }}</p>
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
          title: 'Patch 6.5 Updates',
          content: 'Explore new content in the latest patch!',
          date: '2023-10-03'
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
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 40px;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
  url('@/assets/logo.png');
  background-size: cover;
  color: white;
  border-radius: 8px;
}

.banner .logo {
  height: 80px;
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
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
}

.coming-soon {
  background: #f5f5f5;
  border: 1px dashed #ccc;
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
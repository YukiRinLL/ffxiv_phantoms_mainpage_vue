<template>
  <div>
    <!-- 原有的header部分保持不变 -->
    <header>
      <div class="container container_solid">
        <div class="title_wrapper">
          <h1>Phantom</h1>
          <h2>FFXIV Mobile</h2>
          <h3>Freecompany and Cross-world Linkshell</h3>
        </div>
      </div>
      <div class="container container_image" aria-hidden="true">
        <div class="title_wrapper">
          <h1>Phantom</h1>
          <h2>FFXIV Mobile</h2>
          <h3>Freecompany and Cross-world Linkshell</h3>
        </div>
      </div>
    </header>
    
    <!-- 美化后的section部分 -->
    <section>
      <div class="section-header">
        <h1>最终幻想-水晶世界 FC & Linkshell</h1>
        <div class="header-divider"></div>
      </div>
      
      <div class="content-card">
        <div class="card-header">
          <h2>基本信息</h2>
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">服务器:</span>
            <span class="info-value">天幕魔导城</span>
          </div>
          <div class="info-item">
            <span class="info-label">部队名称:</span>
            <span class="info-value">Phantom</span>
          </div>
          <div class="info-item">
            <span class="info-label">部队后缀:</span>
            <span class="info-value">＜虚妄＞</span>
          </div>
          <div class="info-item">
            <span class="info-label">部队规模:</span>
            <span class="info-value">35人</span>
          </div>
          <div class="info-item">
            <span class="info-label">语言环境:</span>
            <span class="info-value">中文 (Chinese)</span>
          </div>
          <div class="info-item">
            <span class="info-label">活跃时间:</span>
            <span class="info-value">全天 (All day)</span>
          </div>
          <div class="info-item">
            <span class="info-label">联系方式:</span>
            <span class="info-value">QQ Group: 936746977</span>
          </div>
          <div class="info-item">
            <span class="info-label">申请方式:</span>
            <span class="info-value">请联系任一管理员</span>
          </div>
        </div>
      </div>
      
      <div class="content-card">
        <div class="card-header">
          <h2>About FC/Linkshell</h2>
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </div>
        
        <div class="feature-block">
          <h3 class="feature-title">共同运营</h3>
          <div class="feature-content">
            <p>组内讨论氛围良好, 有许多热心的艾欧泽亚冒险者。</p>
            <p>讨论话题多为FF14游戏玩法机制/剧情/世界观设定/游戏环境 等内容。</p>
            <p>部队房装潢设施齐全，公会相关设定精细， 部队箱各类宠物坐骑消耗品免费供给！</p>
            <p>可以一起体验各类副本攻略、宝物探索、出海垂钓等团队活动。</p>
            <p>萌新大佬都可以开诚布公，共同打造良好环境，一起建设一个更好的FC。</p>
          </div>
        </div>
        
        <div class="feature-block">
          <h3 class="feature-title">一起Happy</h3>
          <div class="feature-content">
            <p>找朋友们一起玩!在FC聊天频道中问问"玩点什么？",我当然会邀请你！</p>
            <p>FC不限制视频拍摄、直播、社交平台上的截屏投稿等共享手段，请自由享受。</p>
          </div>
        </div>
        
        <div class="feature-block">
          <h3 class="feature-title">平和友善 相互尊重</h3>
          <div class="feature-content">
            <p>玩游戏开心第一！</p>
            <p>在MMORPG里也请保持自己的独立性，互相尊重和换位思考,不要将自己的想法强加对方。</p>
            <p>请重视对方的想法，然后试着请求或者帮忙，</p>
            <p>了解对方是避免强迫的最好的行为，注意不要因为自我深信而让对方不愉快。</p>
            <p>在不强迫的游戏中开心同乐才是最好的。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'GreatOutdoors',
};
</script>

<style scoped>
/* 原有的header样式保持不变 */
header {
  height: 200vh;
}

.container {
  clip: rect(0, auto, auto, 0);
  overflow: hidden;
  position: absolute;
  height: 100vh;
  min-height: 100%;
  left: 0;
  width: 100%;
  min-width: 100%;
}

.container_solid {
  background: white;
  top: 0;
}

.title_wrapper {
  position: fixed;
  display: block;
  margin: auto;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.title_wrapper h1 {
  text-align: center;
  font-size: 64px;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Fraunces', serif;
  font-weight: 900;
}

.container_solid .title_wrapper h1 {
  background: url("@/assets/images/mobile/1ae282b2f34fba7ebd195852fe07a294_720.png");
  background-size: 100vw auto;
  background-repeat: no-repeat;
  background-position: center;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.container_image {
  background-image: url("@/assets/images/mobile/1ae282b2f34fba7ebd195852fe07a294_720.png");
  background-size: 100vw auto;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  top: 100vh;
}

.container_image .title_wrapper h1 {
  color: white;
}
.container_image .title_wrapper h2 {
  color: white;
}
.container_image .title_wrapper h3 {
  color: white;
}

/* 美化后的section样式 */
section {
  min-height: 100vh;
  padding: 2em;
  margin: auto;
  max-width: 800px;
  background: white;
  position: relative;
  z-index: 3;
  text-align: left;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-header h1 {
  font-size: 2.2em;
  margin-bottom: 0.5em;
  color: #2c3e50;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.header-divider {
  height: 4px;
  width: 100px;
  background: linear-gradient(90deg, #13364e, #361f3e);
  margin: 0 auto;
  border-radius: 2px;
}

.content-card {
  background: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-left: 4px solid #989898;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.75rem;
}

.card-header h2 {
  font-size: 1.6em;
  color: #2c3e50;
  margin: 0;
}

.icon-wrapper {
  color: #868686;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #ecf0f1;
}

.info-label {
  font-weight: 600;
  color: #2c3e50;
  min-width: 100px;
  margin-right: 1rem;
}

.info-value {
  color: #34495e;
}

.feature-block {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f1f1f1;
}

.feature-block:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.feature-title {
  font-size: 1.3em;
  color: #414141;
  margin-bottom: 0.75rem;
  padding-left: 0.5rem;
  border-left: 3px solid #cecece;
}

.feature-content p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
  color: #555;
}

.feature-content p:last-child {
  margin-bottom: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .icon-wrapper {
    margin-top: 0.5rem;
  }
  
  .section-header h1 {
    font-size: 1.8em;
  }
}
</style>
<template>
  <div>
    <header>
      <div class="container container_solid">
        <div class="title_wrapper">
          <h1>Phantom</h1>
          <h2>FFXIV Mobile Freecompany and Cross-world Linkshell</h2>
        </div>
      </div>
      <div class="container container_image" aria-hidden="true">
        <div class="title_wrapper">
          <h1>Phantom</h1>
          <h2>FFXIV Mobile Freecompany and Cross-world Linkshell</h2>
        </div>
      </div>
    </header>
    <section>
      <h1>最终幻想-水晶世界 FC & Linkshell</h1>
      <h2>基本信息</h2>
      <p>
        <strong>服务器:</strong> 天幕魔导城<br>
        <strong>部队名称:</strong> Phantom<br>
        <strong>部队后缀:</strong> ＜虚妄＞<br>
        <strong>部队规模:</strong> 35人 <br>
        <strong>语言环境:</strong> 中文 (Chinese)<br>
        <strong>活跃时间:</strong> 全天 (All day)<br>
        <strong>联系方式:</strong> QQ Group: 936746977<br>
        <strong>申请方式:</strong> 请联系任一管理员<br>
      </p>
      <h2>About FC/Linkshell</h2>
      <p>
        <strong>共同运营</strong><br>
        组内讨论氛围良好, 有许多热心的艾欧泽亚冒险者。<br>
        讨论话题多为FF14游戏玩法机制/剧情/世界观设定/游戏环境 等内容。<br>
        部队房装潢设施齐全，公会相关设定精细， 部队箱各类宠物坐骑消耗品免费供给！<br>
        可以一起体验各类副本攻略、宝物探索、出海垂钓等团队活动。<br>
        萌新大佬都可以开诚布公，共同打造良好环境，一起建设一个更好的FC。<br>
      </p>
      <p>
        <strong>一起Happy</strong><br>
        找朋友们一起玩!在FC聊天频道中问问“玩点什么？”,我当然会邀请你！<br>
        FC不限制视频拍摄、直播、社交平台上的截屏投稿等共享手段，请自由享受。<br>
      </p>
      <p>
        <strong>平和友善 相互尊重</strong><br>
        玩游戏开心第一！<br>
        在MMORPG里也请保持自己的独立性，互相尊重和换位思考,不要将自己的想法强加对方。<br>
        请重视对方的想法，然后试着请求或者帮忙，<br>
        了解对方是避免强迫的最好的行为，注意不要因为自我深信而让对方不愉快。<br>
        在不强迫的游戏中开心同乐才是最好的。
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'GreatOutdoors',
};
</script>

<style scoped>
header {
  height: 200vh;
}

.container {
  clip: rect(0, auto, auto, 0);
  overflow: hidden;
  position: absolute;
  height: 100vh;
  left: 0;
  width: 100%;
  /* 确保容器可以扩展到整个屏幕宽度 */
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
  background-repeat: no-repeat; /* 添加不重复 */
  background-position: center;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.container_image {
  background-image: url("@/assets/images/mobile/1ae282b2f34fba7ebd195852fe07a294_720.png");
  background-size: 100vw auto;
  background-repeat: no-repeat; /* 添加不重复 */
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

section {
  min-height: 100vh;
  padding: 2em;
  margin: auto;
  max-width: 800px;
  background: white;
  position: relative;
  z-index: 3;
  text-align: left; /* 设置文本左对齐 */
}

section h1, section h2, section p {
  text-align: left; /* 确保标题和段落也左对齐 */
}

section h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

section h2 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

section p {
  margin-bottom: 1em;
}
</style>
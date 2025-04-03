<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Welcome to the FFXIV Weather Forecast application.<br>
      Check the weather conditions across Eorzea!
    </p>
    <div class="xiv-logo">
      <!-- 可以添加FFXIV相关图片或图标 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.hello {
  margin-bottom: 40px;
}

h1 {
  color: #4d4dff; /* FFXIV主题蓝色 */
}

.xiv-logo {
  margin: 20px 0;
  height: 100px;
  background: url('../assets/logo.png') no-repeat center;
  background-size: contain;
}
</style>
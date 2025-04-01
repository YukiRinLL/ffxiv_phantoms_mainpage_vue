const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/ffxiv_phantoms_mainpage_vue/'  // 替换为你的仓库名
      : '/',
  devServer: {
    port: 3000,  // 设置开发服务器端口为 3000
    open: true    // 可选：启动后自动打开浏览器
  }
})
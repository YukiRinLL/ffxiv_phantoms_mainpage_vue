const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/ffxiv_phantoms_mainpage_vue/'  // 替换为你的仓库名
      : '/'
})
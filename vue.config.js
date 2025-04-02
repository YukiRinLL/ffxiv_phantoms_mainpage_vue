const { defineConfig } = require('@vue/cli-service')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: [],
  publicPath: process.env.NODE_ENV === 'production'
      ? '/ffxiv_phantoms_mainpage_vue/'  // 仓库名
      : '/',
  devServer: {
    client: {
      webSocketURL: {
        hostname: 'localhost',
        pathname: '/ws',
        protocol: 'ws'
      }
    },
    port: 3000,  // 设置开发服务器端口为 3000
    open: true    // 可选：启动后自动打开浏览器
  },
  configureWebpack: {
    plugins: [
      new CaseSensitivePathsPlugin()
    ]
  }
})
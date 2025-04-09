const { defineConfig } = require('@vue/cli-service')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: [],

  publicPath: process.env.NODE_ENV === 'production'
      ? '/ffxiv_phantoms_mainpage_vue/'  // 仓库名
      : '/',

  outputDir: 'dist', // 默认构建目录（需与 Render 的 Publish Directory 一致）
  filenameHashing: true, // 为资源添加哈希
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
    ],
    output: {
      // chunkFormat: 'array-push'
      // 移除了 chunkFormat 属性，添加其他有效的 output 配置
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      // 明确指定 chunk 格式
      chunkFormat: 'array-push' // 或者 'commonjs' 根据你的需求
    },
    // 添加目标环境配置
    target: ['web', 'es5'] // 明确指定目标环境
  },
  chainWebpack: config => {
    config.output.filename('js/[name].js').chunkFilename('js/[name].js');
    config.plugin('html').tap(args => [{
      ...args[0],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }])
  }
})
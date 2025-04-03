const { defineConfig } = require('@vue/cli-service')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: false,
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
      new (require('case-sensitive-paths-webpack-plugin'))()
    ],
    output: {
      chunkFormat: 'array-push'
    }
  },
  chainWebpack: config => {
    // 明确配置 html-webpack-plugin
    config.plugin('html').tap(args => {
      return [{
        ...args[0],
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }]
    })
    // 添加大小写敏感插件
    config.plugin('case-sensitive-paths')
        .use(CaseSensitivePathsPlugin)
  },

})
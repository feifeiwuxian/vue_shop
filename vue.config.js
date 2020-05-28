const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 关掉lint检查
  // lintOnSave: false
  // 开启调试
  // webpack 配置
  configureWebpack: (config) => {
    // 环境变量
    config.resolve = {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src')
      }
    }

    // 开启 source-map 方便调试
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map'
    }
  }
}

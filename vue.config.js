const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'components':'@/components',
        'common':'@/common',
        'network':'@/network',
        'views':'@/views',
      }
    }
  },
  transpileDependencies: true,
  lintOnSave:false
})

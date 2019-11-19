const path = require('path');
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
    config
      .module
      .rule('vue')
      .test(/\.vue$/)
      .use('iview-loader')
      .loader('iview-loader')
      .tap(options => {
        // 修改它的选项...
        return {
          prefix: false
        };
      })
      .end();
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/api/*': {
        changeOrigin: true, // 是否跨域
        secure: false,
        target: 'http://testbrowser.lambda.im/',//正式代理接口
      }
    },
    clientLogLevel: 'none',
    open: true,
  }
};

// 全局使用mixin.less,不用总是导入
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        // path.resolve(__dirname, 'src/styles/variable.less'),
        path.resolve(__dirname, 'src/common/css/mixin.less')
      ]
    });
}

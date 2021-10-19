const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  // lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@/assets", resolve("src/assets"))
      .set("@/components", resolve("src/components"))
      .set("@/views", resolve("src/views"))
      .set("@/router", resolve("src/router"))
      .set("@/store", resolve("src/store"));
  },
  // 代理
  devServer: {
    // open: true, // auto open brower 项目启动后自动打开浏览器...
    disableHostCheck: false,
    host: "0.0.0.0",
    port: 8099, // 修改端口号
    https: false,
    hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: {     // string | Object 解决跨域问题
      '/zhuanlan': {
        target: 'https://apis.shukeapp.net',
        // target: 'https://superclass-dev.mdzz.gs',
        changeOrigin: true,
        ws: true,
        // pathRewrite: {
        //   '^/zhuanlan': ''
        // }
    }
  },
},
}

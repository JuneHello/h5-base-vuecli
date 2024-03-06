const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("@vant/auto-import-resolver");
const Components = require("unplugin-vue-components/webpack");
const AutoImport = require("unplugin-auto-import/webpack");
const isProd = process.env.NODE_ENV === "production";

module.exports = defineConfig({
  devServer: {
    host: "localhost",
    port: 8080,
    https: false, // https:{type:Boolean}
    open: true
    // proxy: {
    //   "/api": {
    //     target: "", //目标主机
    //     ws: true, //代理的WebSockets
    //     changeOrigin: true,
    //   },
    //   "/api2": {
    //     target: "",
    //   },
    // }
  },
  transpileDependencies: isProd,
  productionSourceMap: !isProd,
  lintOnSave: "warning",
  configureWebpack: {
    plugins: [
      AutoImport({
        dts: "src/auto-imports.d.ts",
        imports: ["vue"],
        eslintrc: {
          enabled: true
        }
      }),
      Components.default({ resolvers: [VantResolver()] })
    ]
  },
  chainWebpack: config => {
    config.plugin("define").tap(definitions => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: "true",
        __VUE_PROD_DEVTOOLS__: "false",
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false"
      });
      return definitions;
    });
  },
  css: {
    extract: true,
    sourceMap: !isProd,
    loaderOptions: {}
  }
});

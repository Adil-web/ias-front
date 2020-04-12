module.exports = {
  outputDir:'/var/www/ias-front/',
  publicPath: './',
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: {
    extract: false
  },
  devServer: {
    // contentBase: path.join(__dirname, 'public'),
    compress: true,
    open: true,
    port: 8080
    // ,
    //
    // proxy: {
    //     '/api/v1': {
    //         target: 'http://localhost:10000',
    //         ws: true,
    //         changeOrigin: true,
    //     },
    // }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}


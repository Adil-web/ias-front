module.exports = {
  devServer: {
    // contentBase: path.join(__dirname, 'public'),
    compress: true,
    open: true,
    port: 8090
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


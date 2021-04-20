module.exports = {
    devServer: {
          proxy: process.env.VUE_APP_CELTRA_URL,
    }
}
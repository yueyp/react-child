const packageName = require('./package.json').name

/* craco.config.js */
module.exports = {
    devServer: (_) => {
        const config = _
        config.headers = {
            'Access-Control-Allow-Origin': '*',
        }
        config.historyApiFallback = true
        config.hot = false
        config.watchContentBase = false
        config.liveReload = false
        return config
    },
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            // 微应用的包名，这里与主应用中注册的微应用名称一致
            webpackConfig.output.library = packageName
            // 将你的 library 暴露为所有的模块定义下都可运行的方式
            webpackConfig.output.libraryTarget = 'umd'
            // 按需加载相关，设置为 webpackJsonp_MicroAppOrde 即可
            webpackConfig.output.jsonpFunction = `webpackJsonp_${packageName}`
            return webpackConfig
        },
    },
}

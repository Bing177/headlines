const {
	defineConfig,
} = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	publicPath: '/',
	devServer: {
		open: true,
		https: false,
		host: 'localhost',
		port: 8080
	},
	chainWebpack: (config) => {
		config.module
			.rule('images')
			.test(/\.(jpe?g|gif|png|svg)$/)
			.set('parser', {
				dataUrlCondition: {
					maxSize: 10 * 1024
				}
			})
	}
})

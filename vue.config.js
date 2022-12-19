const {
	defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	devServer: {
		open: true,
		https: false,
		host: 'localhost',
		port: 8080
	}
})

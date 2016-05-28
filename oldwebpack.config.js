
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig= new HtmlWebpackPlugin({
	template: path.join(__dirname + '/app/index.html'),
	filename: 'index.html', 
	inject: 'body'
})

module.exports = {
	entry: [
		'./app/index.js'
	],
	output: {
		path: path.join(__dirname + 'dist'),
		filename: "index_bundle.js",
		publicPath: 'dist/'
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
			{test: /\.css$/, loader:"style-loader!css-loader"}
		]
	},
	stats: {
        // Configure the console output
        colors: true,
        modules: true,
        reasons: true
    },
	plugins: [HtmlWebpackPluginConfig],

	progress: true, // Don't show progress
    // Defaults to true

    failOnError: true, // don't report error to grunt if webpack find errors
    // Use this if webpack errors are tolerable and grunt should continue

    watch: true, // use webpacks watcher
    // You need to keep the grunt process alive

    keepalive: true, // don't finish the grunt task
    // Use this in combination with the watch option
}
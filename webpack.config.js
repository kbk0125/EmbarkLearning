var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPluginConfig= new HtmlWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html', 
	inject: 'body'
})

module.exports = {
	entry: [
		'webpack-hot-middleware/client?reload=true',
		path.join(__dirname, 'app/index.js')
	],
	output: {
		path:  path.join(__dirname, '/dist/'),
		filename: '[name].js',
		publicPath: '/'
	},
	devtool: 'eval-source-map',
	
	plugins: [
		HtmlWebpackPluginConfig,
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
		  'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {"presets": ["react", "es2015", "stage-0", "react-hmre"]}},
			{test: /\.css$/, loaders: [
			    'style?sourceMap',
			    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
			]
			},
			//https://github.com/shama/stylus-loader
			{ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
		]
	}
}
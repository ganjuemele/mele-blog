const HtmlWebpackPlugin = require ('html-webpack-plugin');
// const path = require ('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].[contenthash].js',
	},
	plugins: [new HtmlWebpackPlugin ({
		title: 'webpack-demo',
		template: './src/assets/index.html'
	})],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader',
					'css-loader',
					{loader: "sass-loader", options: {
						implementation: require('dart-sass')
						}}]
			},
		],
	},
};
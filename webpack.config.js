const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './src/scripts/index.js',
	output: {
		filename: './script/bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		open: true,
		compress: true,
		stats: 'errors-only'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', options: { presets: ['@babel/preset-env'] }
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(jpg|png|svg|webp)$/,
				loader: 'file-loader',
				options: { name: '[name].[ext]', outputPath: 'images', publicPath: '' }
			},
			{
				test: /\.(eot|otf|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: { name: '[name].[ext]', outputPath: 'fonts' }
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: './style/style.css'
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'images/**', to: path.resolve(__dirname, 'dist') },
				{ from: 'docs/**', to: path.resolve(__dirname, 'dist') }
			]
		}),
		...['index', 'about', 'contact'].map(el => {
			return new HtmlWebpackPlugin({
				filename: `${el}.html`,
				template: `./src/${el}.pug`,
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true
				}
			})
		})
	]
}
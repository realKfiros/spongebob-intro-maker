const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			}
		]
	},
	output: {
		path: path.resolve(__dirname, "build")
	},
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};

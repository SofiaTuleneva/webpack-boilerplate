let path = require('path');
let HandlebarsPlugin = require("handlebars-webpack-plugin");

let webpackConfig = {
	entry: './app/src',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		publicPath: '/dist',
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.less$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader', options: {
						sourceMap: true
					}
				}, {
					loader: 'less-loader', options: {
						sourceMap: true
					}
				}]
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':data-src']
					}
				}
			},
			{
				test: /\.handlebars$/,
				loader: "handlebars-loader"
			}
		]
	},



	plugins: [

		new HandlebarsPlugin({
			// path to hbs entry file(s)
			entry: path.join(process.cwd(), "app", "src", "*.hbs"),
			// output path and filename(s). This should lie within the webpacks output-folder
			// if ommited, the input filepath stripped of its extension will be used
			output: path.join(process.cwd(), "dist", "index.html"),
			// // data passed to main hbs template: `main-template(data)`
			// data: require("./app/data/project.json"),
			// or add it as filepath to rebuild data on change using webpack-dev-server
			data: path.join(__dirname, "app/data/project.json"),

			// globbed path to partials, where folder/filename is unique
			partials: [
				path.join(process.cwd(), "app", "src", "templates", "*.hbs")
			],

			// register custom helpers. May be either a function or a glob-pattern
			helpers: {
				nameOfHbsHelper: Function.prototype,
				projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
			},

			// hooks
			onBeforeSetup: function (Handlebars) {},
			onBeforeAddPartials: function (Handlebars, partialsMap) {},
			onBeforeCompile: function (Handlebars, templateContent) {},
			onBeforeRender: function (Handlebars, data) {},
			onBeforeSave: function (Handlebars, resultHtml, filename) {},
			onDone: function (Handlebars, filename) {}
		})
	]

};

module.exports = webpackConfig;
var config = require('./webpack.base.js');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

config.plugins.push(new UglifyJsPlugin());

module.exports = config;
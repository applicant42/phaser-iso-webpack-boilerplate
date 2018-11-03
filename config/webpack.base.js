var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcPath = path.join(__dirname, '../src');

module.exports = {  
  entry: {
    app: path.join(srcPath, 'app.js'),
    vendor: path.join(srcPath, 'vendor.js')
  },
  output: {
      path: path.join(__dirname, '../dist'),
      filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /pixi\.min/,
        loader: "expose-loader?PIXI"
      },
      {
        test: /p2\.min/,
        loader: "expose-loader?p2"
      },
      {
        test: /phaser-split\.min/,
        loader: "expose-loader?Phaser"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: function (chunk1, chunk2) {
        var orders = ['vendor', 'app'];
        var order1 = orders.indexOf(chunk1.names[0]);
        var order2 = orders.indexOf(chunk2.names[0]);
        return order1 - order2;
      }
    })
  ]
}
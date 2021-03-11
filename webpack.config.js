const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/javascripts/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './javascripts/my.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg)/, //正規表現
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        }
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './stylesheets/my.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/access.pug',
      filename: 'access.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/members/taro.pug',
      filename: 'members/taro.html'
    }),
    new CleanWebpackPlugin()
  ]
}

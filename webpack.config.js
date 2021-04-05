const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/javascripts/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './javascripts/my.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tex)/,
        exclude: /node_modules/, // node_modules内のファイルを除外
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.vue/,
        exclude: /node_modules/, // node_modules内のファイルを除外
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.js/,
        exclude: /node_modules/,　// node_modules内のファイルを除外
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { 'targets': '> 0.25%, not dead' }],
                '@babel/preset-react'
              ]
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg)/, //正規表現
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              }
            }
          }
        ]
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
    new VueLoaderPlugin(),
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

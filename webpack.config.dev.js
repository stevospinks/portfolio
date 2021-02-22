const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map',
  entry: './src/index.tsx',
  stats: 'minimal',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/', // public url of output directory when referenced in the browser
    filename: 'bundle.js'
  },
  devServer: {
    overlay: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images/project-images', to: 'project-images' },
        { from: 'src/data/projects.json', to: 'data/projects.json' }
      ]
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jp(e*)g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192 // 8kb
            }
          }
        ]
      }
    ]
  }
};

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');

process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '', // public url of output directory when referenced in the browser
    filename: 'bundle.[contenthash].js'
  },
  plugins: [
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // This global makes sure React is built in prod mode.
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico',
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/images/project-images',
        to: 'project-images'
      },
      {
        from: 'src/data/projects.json',
        to: 'data/projects.json'
      },
      {
        from: 'src/.htaccess',
        to: ''
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(s*)css$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('cssnano')],
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jp(e*)g)$/,
        exclude: /(node_modules)/,
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

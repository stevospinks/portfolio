const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

process.env.NODE_ENV = 'production';

function buildConfig(configDirs) {
  var config = require('./common.js')(configDirs);

  config.mode = 'production';
  config.devtool = 'source-map';
  config.output.filename = 'bundle.[contenthash].js';

  config.plugins.push(
    new WebpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // This global makes sure React is built in prod mode.
    })
  );

  config.module.rules.push({
    test: /\.(s*)css$/,
    include: configDirs.APP_DIR,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader',
        options: { sourceMap: true }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          postcssOptions: { plugins: [require.resolve('cssnano')] }
        }
      },
      {
        loader: 'sass-loader',
        options: { sourceMap: true }
      }
    ]
  });

  return config;
}

module.exports = buildConfig;

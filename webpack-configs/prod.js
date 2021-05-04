const purgecss = require('@fullhuman/postcss-purgecss');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

process.env.NODE_ENV = 'production';

function buildConfig(directories) {
  var config = require('./common.js')(directories);

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

  config.optimization = {
    minimize: true,
    minimizer: [
      `...`, // extends existing minimizers (i.e. `terser-webpack-plugin`)
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ]
  };

  config.module.rules.push({
    test: /\.(s*)css$/,
    include: directories.app,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { sourceMap: true }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          postcssOptions: {
            plugins: [purgecss({ content: glob.sync(`${directories.app}/**/*`, { nodir: true }) })]
          }
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

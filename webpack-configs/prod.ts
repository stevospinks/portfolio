import purgecss from '@fullhuman/postcss-purgecss';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { globSync } from 'glob';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration, DefinePlugin } from 'webpack';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import { buildConfig as buildCommonConfig } from './common';
import { Directories } from './interfaces/directories';

export function buildConfig(directories: Directories): Configuration {
  process.env.NODE_ENV = 'production';
  const config = buildCommonConfig(directories);

  config.mode = 'production';
  config.output!.filename = 'bundle.[contenthash].js';

  config.plugins!.push(
    new WebpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), // This global makes sure React is built in prod mode.
    }),
  );

  config.optimization = {
    minimize: true,
    minimizer: [
      `...`, // extends existing minimizers
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  };

  config.module!.rules!.push({
    test: /\.(s*)css$/,
    include: directories.src,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [purgecss({ content: globSync(`${directories.src}/**/*`, { nodir: true }) })],
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: { quietDeps: true },
        },
      },
    ],
  });

  return config;
}

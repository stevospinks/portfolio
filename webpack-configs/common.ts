import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import { Directories } from './interfaces/directories';

export function buildConfig(directories: Directories): Configuration {
  return {
    target: 'web',
    entry: './src/index.tsx',
    output: {
      publicPath: '',
      path: directories.build,
      pathinfo: false,
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/.htaccess', to: '' },
          { from: 'src/favicon.ico', to: '' },
          { from: 'src/assets/images', to: 'images' },
          { from: 'src/assets/data', to: 'data' },
        ],
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      symlinks: false,
      cacheWithContext: false,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: directories.src,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|jp(e*)g)$/,
          include: directories.src,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192, // 8kb
              },
            },
          ],
        },
      ],
    },
  };
}

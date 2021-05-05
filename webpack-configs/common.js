const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function buildConfig(directories) {
  return {
    target: 'web',
    entry: './src/index.tsx',
    output: {
      publicPath: '',
      path: directories.build,
      pathinfo: false
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/.htaccess', to: '' },
          { from: 'src/favicon.ico', to: '' },
          { from: 'src/assets/images', to: 'images' },
          { from: 'src/assets/data', to: 'data' }
        ]
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx']
      })
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      symlinks: false,
      cacheWithContext: false
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: directories.app,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
            }
          }
        },
        {
          test: /\.(png|jp(e*)g)$/,
          include: directories.app,
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
}

module.exports = buildConfig;

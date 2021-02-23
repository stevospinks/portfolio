const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function buildConfig(configDirs) {
  return {
    target: 'web',
    entry: './src/index.tsx',
    output: {
      publicPath: '',
      path: configDirs.BUILD_DIR,
      pathinfo: false
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/.htaccess', to: '' },
          { from: 'src/favicon.ico', to: '' },
          { from: 'src/images/project-images', to: 'project-images' },
          { from: 'src/data/projects.json', to: 'data/projects.json' }
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
          include: configDirs.APP_DIR,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
            }
          }
        },
        {
          test: /\.(png|jp(e*)g)$/,
          include: configDirs.APP_DIR,
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

const webpack = require('webpack');

process.env.NODE_ENV = 'development';

function buildConfig(directories) {
  var config = require('./common.js')(directories);

  config.mode = 'development';
  config.devtool = 'eval-source-map';
  config.stats = 'minimal';
  config.output.filename = 'bundle.js';

  config.devServer = {
    client: {
      overlay: true
    },
    historyApiFallback: true
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // This global makes sure React is built in dev mode.
    })
  );

  config.module.rules.push({
    test: /\.(s*)css$/,
    include: directories.app,
    use: ['style-loader', 'css-loader', 'sass-loader']
  });

  return config;
}

module.exports = buildConfig;

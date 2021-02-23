var path = require('path');
var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src');

const configDirs = {
  BUILD_DIR: BUILD_DIR,
  APP_DIR: APP_DIR
};

function buildConfig(args) {
  if (args.dev) {
    configName = 'dev';
  } else if (args.prod) {
    configName = 'prod';
  } else {
    console.log("Wrong webpack build parameter. Possible choices: 'dev' or 'prod'.");
    return;
  }

  var config = require('./webpack-configs/' + configName + '.js')(configDirs);
  return config;
}

module.exports = buildConfig;

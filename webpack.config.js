var path = require('path');

function buildConfig(args) {
  let configName;
  if (args.dev) {
    configName = 'dev';
  } else if (args.prod) {
    configName = 'prod';
  } else {
    console.log("Wrong webpack build parameter. Possible choices: 'dev' or 'prod'.");
    return;
  }

  const directories = {
    build: path.resolve(__dirname, './build'),
    app: path.resolve(__dirname, './src')
  };
  return require('./webpack-configs/' + configName + '.js')(directories);
}

module.exports = buildConfig;

import { resolve } from 'path';
import { Configuration } from 'webpack';
import { buildConfig as buildDevConfig } from './webpack-configs/dev';
import { Directories } from './webpack-configs/interfaces/directories';
import { buildConfig as buildProdConfig } from './webpack-configs/prod';

interface Args {
  dev?: string;
  prod?: string;
}

function webpackConfig(args: Args): Configuration | undefined {
  const directories: Directories = {
    build: resolve(__dirname, './build'),
    src: resolve(__dirname, './src')
  };

  if (args.dev) {
    return buildDevConfig(directories);
  } else if (args.prod) {
    return buildProdConfig(directories);
  } else {
    console.log("Wrong webpack build parameter. Possible choices: 'dev' or 'prod'.");
    return;
  }
}

export default webpackConfig;

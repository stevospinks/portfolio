import { resolve } from 'path';
import { Configuration } from 'webpack';
import { buildDevConfig } from './webpack-configs/dev';
import { Directories } from './webpack-configs/interfaces/directories';
import { buildProdConfig } from './webpack-configs/prod';

interface Args {
  dev?: string;
  prod?: string;
}

function buildConfig(args: Args): Configuration | undefined {
  const directories = {
    build: resolve(__dirname, './build'),
    src: resolve(__dirname, './src')
  } as Directories;

  if (args.dev) {
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    /* eslint-disable @typescript-eslint/no-unsafe-return */
    return buildDevConfig(directories);
  } else if (args.prod) {
    return buildProdConfig(directories);
    /* eslint-enable @typescript-eslint/no-unsafe-call */
    /* eslint-enable @typescript-eslint/no-unsafe-return */
  } else {
    console.log("Wrong webpack build parameter. Possible choices: 'dev' or 'prod'.");
    return;
  }
}

export default buildConfig;

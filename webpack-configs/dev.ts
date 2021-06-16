import { Configuration, DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import { buildConfig as buildCommonConfig } from './common';
import { Directories } from './interfaces/directories';

export function buildConfig(directories: Directories): Configuration {
  process.env.NODE_ENV = 'development';
  const config = buildCommonConfig(directories);

  config.mode = 'development';
  config.devtool = 'eval-source-map';
  config.stats = 'minimal';
  config.output!.filename = 'bundle.js';

  config.plugins!.push(
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // This global makes sure React is built in dev mode.
    })
  );

  config.module!.rules!.push({
    test: /\.(s*)css$/,
    include: directories.src,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sassOptions: { quietDeps: true }
        }
      }
    ]
  });

  return config;
}

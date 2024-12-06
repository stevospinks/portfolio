import { Configuration, DefinePlugin } from 'webpack';
import { Configuration as DevConfiguration } from 'webpack-dev-server';
import { buildConfig as buildCommonConfig } from './common';
import { Directories } from './interfaces/directories';
import ESLintPlugin from 'eslint-webpack-plugin';

export function buildConfig(directories: Directories): Configuration {
  process.env.NODE_ENV = 'development';
  const config = buildCommonConfig(directories);

  config.mode = 'development';
  config.devtool = 'eval-source-map';
  config.stats = 'minimal';
  config.output!.filename = 'bundle.js';

  config.plugins!.push(
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // This global makes sure React is built in dev mode.
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      configType: "flat"
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

  const devConfig: DevConfiguration = { allowedHosts: ['all'], hot:true };
  config.devServer = devConfig;

  return config;
}

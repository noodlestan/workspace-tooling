import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

import { commonConfig } from './common.mjs';
import { copyStaticFilesPlugin } from '../plugins/copyStaticFiles.mjs';

export const esmConfig = {
  ...commonConfig,
  entryPoints: ['src/**/*.ts'],
  format: 'esm',
  platform: 'node',
  target: 'esnext',
  outdir: 'dist/esm',
  outExtension: { '.js': '.mjs' },
  plugins: [esbuildPluginFilePathExtensions(), copyStaticFilesPlugin('dist/esm')],
  // write: false,
};

import { commonConfig } from './common.mjs';

export const cjsConfig = {
  ...commonConfig,
  tsconfig: 'tsconfig.cjs.json',
  entryPoints: ['src/index.ts'],
  format: 'cjs',
  platform: 'node',
  target: 'node24',
  outdir: 'dist/cjs',
  plugins: [],
};

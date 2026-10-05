import * as esbuild from 'esbuild';

export const createBuild = (config = {}) => {
  const watch = async () => {
    const ctx = await esbuild.context(config);
    await ctx.watch();
  };

  const build = async () => esbuild.build(config);

  return { watch, build };
};

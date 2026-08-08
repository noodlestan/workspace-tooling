import * as esbuild from 'esbuild';

import { emitTypesPlugin } from '../plugins/emitTypesPlugin.mjs';
import { resolvePackageJson } from '../helpers/resolvePackageJson.mjs';
import { resolveExternalPackages } from '../helpers/resolveExternalPackages.mjs';

export const createBuild = (options = {}, defaults = {}) => {
  const pkg = resolvePackageJson(process.cwd());

  const inferredExternal = resolveExternalPackages(pkg);

  const config = {
    ...defaults,
    ...options,
    external: [
      ...new Set([...inferredExternal, ...(defaults.external ?? []), ...(options.external ?? [])]),
    ],
  };

  const watch = async () => {
    const plugins = config.plugins || [];
    config.plugins = [...plugins, emitTypesPlugin(config.format, false)];
    const ctx = await esbuild.context(config);
    return ctx.watch();
  };

  const build = async () => {
    const plugins = config.plugins || [];
    config.plugins = [...plugins, emitTypesPlugin(config.format)];
    return esbuild.build(config);
  };

  return {
    watch,
    build,
  };
};

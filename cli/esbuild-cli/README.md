# @noodlestan/esbuild

> A small opinionated wrapper around `esbuild` used by Noodlestan packages.

This indirection helps restrict and formalise variance in consumer projects. Without such a tool, each package would need to define and maintain its own build configuration, making common conventions harder to enforce and changes harder to apply consistently.

It also provides a documentation layer for common build patterns, making those conventions explicit and reusable rather than leaving them implicit in individual project configurations.

See also:

- [esbuild docs](https://esbuild.github.io/)
- [esbuild options](https://esbuild.github.io/api/#general-options)

## Usage

### Install and Configure

Install:

```bash
npm install @noodlestan/esbuild
```

Configure via `build.config.mjs` next to your `package.json`.

Example:

```js
export default {
  common: {
    bundle: true,
    tsconfig: 'tsconfig.build.json',
    entryPoints: ['src/bin/parse.ts', 'src/bin/serialize.ts'],
    external: ['commander'],
  },
  esm: {},
};
```

The default export must be an object. It declares an optional `common` block shared by every target, and at least one of the `cjs` or `esm` targets.

```js
export default {
  common: {},
  cjs: {},
  esm: {},
};
```

Wire the entry points into your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "esbuild-cli-watch",
    "build": "esbuild-cli"
  }
}
```

### Options

Options are merged in this order, with later values winning:

1. The shared `commonConfig` defaults.
2. Your `common` block.
3. The defaults for the declared target.
4. Your `cjs` or `esm` block.

The table below lists the `commonConfig` defaults and the per-target defaults. Per-target
values override the shared block, and your own target values override both.

| Option         | Default           | Notes                                             |
| -------------- | ----------------- | ------------------------------------------------- |
| `entryPoints`  | none              | **Mandatory.** Must be set in `common` or target. |
| `bundle`       | `false`           | Set `true` to produce a bundle.                   |
| `tsconfig`     | `tsconfig.json`   |                                                   |
| `sourcemap`    | `true`            |                                                   |
| `logLevel`     | `'info'`          | Set to `'debug'` for detailed errors.             |
| `plugins`      | `[]`              | Add plugins. See example below.                   |
| `external`     | `[]`              | Declare runtime dependencies explicitly.          |
| `define`       | `{}`              | Inject values. See example below.                 |
| `platform`     | `'node'`          |                                                   |
| `format`       | `'esm'` / `'cjs'` | Default according to target.                      |
| `target`       | `'node24'`        |                                                   |
| `outdir`       | `'dist/'`         |                                                   |
| `outExtension` | no mapping        | Set to `{ '.js': '.mjs' }` for modules.           |

### Plugins

Plugins provide opt-in post-build steps. They run after esbuild completes and can be configured to skip when the build reports errors or warnings.

See also:

- [esbuild community plugins](https://github.com/esbuild/community-plugins)

#### `postBuildPlugin`

Runs a command after the build.

```js
import { postBuildPlugin } from '@noodlestan/esbuild/plugins';

postBuildPlugin({
  command: 'npm',
  args: ['run', 'build:types:esm'],
  target: 'esm',
  exitOnError: true,
  skipOnError: true,
  skipOnWarning: true,
});
```

- `command` — command to run.
- `args` — command arguments.
- `target` — target name used in logging.
- `skipOnError` — skip the command when the build reports errors.
- `skipOnWarning` — skip the command when the build reports warnings.
- `exitOnError` — exit when the post-build command fails.

#### `copyStaticFilesPlugin`

Copies matching files recursively from `src` to the build output.

```js
import { copyStaticFilesPlugin } from '@noodlestan/esbuild/plugins';

copyStaticFilesPlugin({
  outdir: 'dist/esm',
  extension: '.json',
  exitOnError: true,
  skipOnError: true,
  skipOnWarning: true,
});
```

- `outdir` — build output directory.
- `extension` — file extension to copy.
- `skipOnError` — skip copying when the build reports errors.
- `skipOnWarning` — skip copying when the build reports warnings.
- `exitOnError` — exit when copying fails.

### Use Cases

#### Inject build-time values

Build-time constants can be injected through esbuild's define option. Read values from project files or other sources in the build configuration, then pass them as JavaScript literals.

```js
import { readFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

export default {
  common: {
    // ...
    define: { __BUILD_VERSION__: JSON.stringify(version) },
  },
};
```

#### Type declarations

Type declaration can be emitted from the consumer project as an opt-in post-build step.

Use the `postBuildPlugin` to run the TypeScript declaration command for each target after a successful build:

```js
import { postBuildPlugin } from '@noodlestan/esbuild/plugins';

export default {
  common: {
    entryPoints: ['src/index.ts'],
  },

  esm: {
    plugins: [
      postBuildPlugin({
        target: 'esm',
        command: 'npm',
        args: ['run', 'build:types:esm'],
      }),
    ],
  },
};
```

Provide a script for each target in the project's `package.json`:

```json
{
  "scripts:": {
    "build:types:esm": "tsc --project tsconfig.esm.json",
    "build:types:cjs": "tsc --project tsconfig.cjs.json"
  }
}
```

The `postBuildPlugin` runs the command after the build.

By default, it skips the command when the build reports errors or warnings, and exits when the post-build command fails.

#### Copy static files

Static files can be copied from the source directory to the build output as an opt-in post-build step.

Use `copyStaticFilesPlugin` to copy files matching a file extension:

```js
import { copyStaticFilesPlugin } from '@noodlestan/esbuild/plugins';

export default {
  common: {
    entryPoints: ['src/index.ts'],
  },

  esm: {
    plugins: [
      copyStaticFilesPlugin({
        outdir: 'dist/esm',
        extension: '.json',
      }),
    ],
  },
};
```

The `copyStaticFilesPlugin` runs after the build.

By default, it skips copying when the build reports errors or warnings, and exits when copying fails.

## Development

Make sure you read the [root README](../../README.md) first.

### Scripts

Run from this package directory:

- `npm run lint` — report prettier issues
- `npm run lint:fix` — fix formatting and lint issues

## License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).

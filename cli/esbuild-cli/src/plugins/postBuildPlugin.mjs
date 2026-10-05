import { spawnSync } from 'child_process';

function runPostBuildCommand({ command, args = [], target, exitOnError = true }) {
  console.info(`🟦 post-build [target ${target}] running...`);

  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env: process.env,
  });

  if (result.error) {
    console.error(`🟥 post-build [target: ${target}] error:`, result.error.message);

    if (exitOnError) {
      process.exit(1);
    }

    return;
  }

  if (result.status !== 0) {
    console.error(`🟥 post-build [target: ${target}] failed with exit code ${result.status}`);

    if (exitOnError) {
      process.exit(result.status);
    }

    return;
  }

  console.info(`🟩 post-build [target: ${target}] success.`);
}

export function postBuildPlugin({
  command,
  args = [],
  target,
  exitOnError = true,
  skipOnError = true,
  skipOnWarning = true,
}) {
  return {
    name: 'post-build',

    setup(build) {
      build.onEnd(result => {
        if (result.errors.length && skipOnError) {
          console.warn(`🟨 post-build [target: ${target}] Skipping due to build errors.`);
          return;
        }

        if (result.warnings.length && skipOnWarning) {
          console.warn(`🟨 post-build [target: ${target}] Skipping due to build warnings.`);
          return;
        }

        runPostBuildCommand({
          command,
          args,
          target,
          exitOnError,
        });
      });
    },
  };
}

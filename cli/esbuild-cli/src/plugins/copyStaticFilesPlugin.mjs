import fs from 'fs/promises';
import path from 'path';

async function copyFilesRecursive(srcDir, destDir, extension) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyFilesRecursive(srcPath, destPath, extension);
    } else if (entry.isFile() && entry.name.endsWith(extension)) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

export function copyStaticFilesPlugin({
  outdir,
  extension = '.json',
  exitOnError = true,
  skipOnError = true,
  skipOnWarning = true,
}) {
  return {
    name: 'copy-static-files',

    setup(build) {
      build.onEnd(async result => {
        if (result.errors.length && skipOnError) {
          console.warn(`🟨 copy-static-files [outdir: ${outdir}] skipping due to build errors.`);
          return;
        }

        if (result.warnings.length && skipOnWarning) {
          console.warn(`🟨 copy-static-files [outdir: ${outdir}] skipping due to build warnings.`);
          return;
        }

        console.info(`🟦 copy-static-files [outdir: ${outdir}] copying ${extension} files...`);

        try {
          await copyFilesRecursive('src', outdir, extension);
        } catch (error) {
          console.error(`🟥 copy-static-files [outdir: ${outdir}] error:`, error);

          if (exitOnError) {
            process.exit(1);
          }

          return;
        }

        console.info(`🟩 copy-static-files [outdir: ${outdir}] success.`);
      });
    },
  };
}

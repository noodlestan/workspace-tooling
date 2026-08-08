import fs from 'fs';
import path from 'path';

export const resolvePackageJson = cwd => {
  const file = path.join(cwd, 'package.json');

  return JSON.parse(fs.readFileSync(file, 'utf8'));
};

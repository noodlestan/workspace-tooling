export const joinPaths = (base, ...segments) => [base, ...segments].filter(Boolean).join('/');

export const slugify = value => value.toLowerCase().replace(/\s+/g, '-');

export const extensionOf = path => {
  const segments = path.split('/');

  return segments[segments.length - 1].split('.')[1];
};

export const defaultExtensions = ['.js', '.cjs', '.mjs', '.mts', '.ts', '.tsx'];

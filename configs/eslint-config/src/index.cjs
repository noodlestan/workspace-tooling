const base = require('./config/_base.cjs');
const typescript = require('./config/typescript.cjs');
const solid = require('./config/solid.cjs');
const configs = require('./config/configs.cjs');
const scripts = require('./config/scripts.cjs');
const tests = require('./config/tests.cjs');
const mdx = require('./config/mdx.cjs');

const config = {
    ...base,
    ignorePatterns: ['node_modules/', 'coverage/', 'dist/'],
    overrides: [...typescript, ...solid, ...configs, ...scripts, ...tests, ...mdx],
};

module.exports = config;

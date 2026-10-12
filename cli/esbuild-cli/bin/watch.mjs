#!/usr/bin/env node

import { loadConfig } from '../src/helpers/loadConfig.mjs';
import { createBuild } from '../src/build/index.mjs';

const config = await loadConfig();

const promises = [];

if (config.cjs) {
	const p = createBuild(config.cjs).watch();
	promises.push(p);
}

if (config.esm) {
	const p = createBuild(config.esm).watch();
	promises.push(p);
}

await Promise.all(promises).catch(err => {
	console.error(err);
	console.error(`🟥 Build failed with errors`);
	process.exit(1);
});

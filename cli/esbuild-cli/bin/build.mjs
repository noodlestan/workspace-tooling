#!/usr/bin/env node

import { loadConfig } from '../src/helpers/loadConfig.mjs';
import { createBuild } from '../src/build/index.mjs';

const config = await loadConfig();

if (config.cjs) {
	try {
		await createBuild(config.cjs).build();
	} catch (err) {
		console.error(err);
		console.error(`🟥 Build failed with errors`);
		process.exit(1);
	}
}

if (config.esm) {
	try {
		await createBuild(config.esm).build();
	} catch (err) {
		console.error(err);
		console.error(`🟥 Build failed with errors`);
		process.exit(1);
	}
}

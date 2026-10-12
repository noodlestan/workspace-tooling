import { existsSync } from 'fs';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

import { commonConfig } from '../config/common.mjs';
import { cjsConfig } from '../config/cjs.mjs';
import { esmConfig } from '../config/esm.mjs';

export async function loadConfig() {
	const configPath = resolve(process.cwd(), 'build.config.mjs');

	if (!existsSync(configPath)) {
		console.error(`🟥 Build config not found: ${configPath}`);
		process.exit(1);
	}

	const { default: config = {} } = await import(pathToFileURL(configPath).href);

	if (typeof config !== 'object' || config === null) {
		console.error('🟥 Invalid build config: expected a default export object');
		process.exit(1);
	}

	const common = {
		...commonConfig,
		...(config.common ?? {}),
	};

	if (!config.cjs && !config.esm) {
		console.error('🟥 Build config must define at least one target: cjs or esm');
		process.exit(1);
	}

	const merged = {};

	if (config.cjs) {
		merged.cjs = {
			...common,
			...cjsConfig,
			...config.cjs,
		};
	}

	if (config.esm) {
		merged.esm = {
			...common,
			...esmConfig,
			...config.esm,
		};
	}

	if (merged.cjs && merged.esm && merged.cjs.outdir === merged.esm.outdir) {
		console.error(`🟥 Build targets cjs and esm both have outDir = ${merged.cjs.outdir}`);
		process.exit(1);
	}

	return merged;
}

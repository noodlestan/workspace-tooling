#!/usr/bin/env node

import { createBuild } from '../src/build/index.mjs';
import { cjsConfig } from '../src/config/cjs.mjs';
import { esmConfig } from '../src/config/esm.mjs';

const cjs = options => createBuild(options, cjsConfig);
const esm = options => createBuild(options, esmConfig);

// TODO resolve build/config.mjs in target repository
const config = {};

await cjs(config).build();
await esm(config).build();

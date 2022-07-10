import * as path from 'node:path';
import fs from 'node:fs/promises';

const projectRootPath = path.resolve('./');
const rootItems = await fs.readdir(projectRootPath);
if (rootItems.indexOf('node_modules') > -1) {
  console.log('Found node_modules, skipping prep');
  process.exit(0);
}

import child_process from 'node:child_process';

child_process.execSync('bun install --no-bin-links');
child_process.execSync('bun bun main.tsx');
child_process.execSync('mv node_modules.bun ./public');
child_process.exec('sh ./run.sh');

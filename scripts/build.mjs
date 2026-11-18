import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist);
cpSync(join(root, 'index.html'), join(dist, 'index.html'));
for (const landing of ['market_lend_1', 'market_lend_2', 'market_lend_3', 'market_lend_4']) {
  cpSync(join(root, landing), join(dist, landing), { recursive: true });
}
console.log('Built dist/ with the selector and four landings.');

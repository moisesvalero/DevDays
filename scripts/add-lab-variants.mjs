/**
 * Añade variant a block() en lab-configs. node scripts/add-lab-variants.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const configsDir = join(root, 'src/lib/components/study/labs/lab-configs');

const FILE_VARIANTS = {
	week1: [
		'inventory',
		'profile',
		'pricetag',
		'formula',
		'compare',
		'formula',
		'listops',
		'status',
		'formula'
	],
	week2: [
		'profile',
		'formula',
		'profile',
		'listops',
		'formula',
		'rules',
		'timeline',
		'timeline',
		'form'
	],
	week3: ['component', 'component', 'inventory', 'formula', 'profile', 'form', 'form'],
	week4: ['route', 'component', 'route', 'timeline', 'form', 'auth'],
	week5: ['profile', 'story', 'timeline', 'story', 'story', 'story']
};

for (const [file, variants] of Object.entries(FILE_VARIANTS)) {
	const path = join(configsDir, `${file}.ts`);
	let src = readFileSync(path, 'utf8');
	if (src.includes("variant: '")) {
		console.log('skip', file);
		continue;
	}
	let idx = 0;
	src = src.replace(/block\(\{\s*\n/g, () => {
		const v = variants[idx++] ?? 'formula';
		return `block({\n      variant: '${v}',\n`;
	});
	writeFileSync(path, src);
	console.log('OK', file, idx);
}

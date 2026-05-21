/**
 * Corrige variant por día. node scripts/fix-lab-variants.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const configsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/lib/components/study/labs/lab-configs');

const DAY_VARIANTS = {
  day1: ['inventory', 'profile', 'pricetag'],
  day3: ['status', 'cta', 'plans'],
  day4: ['formula', 'compare', 'formula'],
  day5: ['listops', 'listops', 'listops'],
  day6: ['formula', 'status', 'listops'],
  day8: ['profile', 'formula', 'profile'],
  day9: ['listops', 'listops', 'rules'],
  day10: ['inventory', 'formula', 'formula'],
  day11: ['timeline', 'timeline', 'timeline'],
  day12: ['timeline', 'timeline', 'timeline'],
  day13: ['cta', 'rules', 'form'],
  day15: ['component', 'component', 'component'],
  day16: ['component', 'component', 'component'],
  day17: ['inventory', 'cta', 'form'],
  day18: ['formula', 'status', 'timeline'],
  day19: ['profile', 'profile', 'profile'],
  day20: ['cta', 'form', 'form'],
  day22: ['route', 'route', 'route'],
  day23: ['component', 'component', 'component'],
  day24: ['route', 'route', 'route'],
  day25: ['timeline', 'timeline', 'component'],
  day26: ['form', 'form', 'form'],
  day27: ['auth', 'auth', 'auth'],
  day29: ['profile', 'profile', 'pricetag'],
  day30: ['story', 'auth', 'component'],
  day31: ['timeline', 'timeline', 'timeline'],
  day32: ['story', 'story', 'story'],
  day33: ['story', 'story', 'story'],
  day34: ['story', 'story', 'story']
};

for (const file of ['week1.ts', 'week2.ts', 'week3.ts', 'week4.ts', 'week5.ts']) {
  const path = join(configsDir, file);
  let src = readFileSync(path, 'utf8');

  for (const [dayKey, variants] of Object.entries(DAY_VARIANTS)) {
    const re = new RegExp(`export const ${dayKey}: DayLabConfig = \\{[\\s\\S]*?labs: \\[([\\s\\S]*?)\\n  \\]`, 'm');
    const m = src.match(re);
    if (!m) continue;

    let labsBlock = m[1];
    let vi = 0;
    labsBlock = labsBlock.replace(/variant: '[^']+'/g, () => `variant: '${variants[vi++] ?? 'formula'}'`);

    src = src.replace(m[0], m[0].replace(m[1], labsBlock));
  }

  writeFileSync(path, src);
  console.log('fixed', file);
}

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
const html = readFileSync(join(root, 'dist/index.html'), 'utf8');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Homepage needs exactly one main heading');
for (const content of ['让工具彼此连接','让执行从容有序','按业务场景发现应用','常用应用','有新的提效需求？']) assert.ok(html.includes(content), `Missing ${content}`);
assert.ok(!html.includes('工具广场'), 'Retired navigation must not return');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate element ids');
for (const [, href] of html.matchAll(/\bhref="([^"]+)"/g)) {
  if (href.startsWith('#')) assert.ok(ids.includes(href.slice(1)), `Missing anchor ${href}`);
  else if (href.startsWith('/')) assert.ok(existsSync(join(root, 'dist', href === '/' ? 'index.html' : href)), `Missing local file ${href}`);
}
for (const [, src] of html.matchAll(/\b(?:src|srcset)="([^"]+)"/g)) if (src.startsWith('/')) assert.ok(existsSync(join(root, 'dist', src)), `Missing asset ${src}`);
for (const resource of ['hero-desktop.webp','fonts/platform-sans.woff2','fonts/LICENSE.txt']) assert.ok(existsSync(join(root,'dist/assets',resource)));
assert.ok(statSync(join(root,'dist/assets/hero-desktop.webp')).size < 400000, 'Hero should remain optimized');
assert.ok(statSync(join(root,'dist/assets/fonts/platform-sans.woff2')).size < 150000, 'Homepage font subset too large');
function files(dir) { return readdirSync(dir,{withFileTypes:true}).flatMap(e => e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]); }
for (const file of files(join(root,'src'))) {
  const source = readFileSync(file,'utf8');
  assert.ok(!/xcnftdmroeck|transition:\s*all/.test(source), `Disallowed content in ${file}`);
}
const css = readFileSync(join(root,'src/styles/global.css'),'utf8');
assert.ok(css.includes('prefers-reduced-motion'));
assert.ok(css.includes('(hover:hover) and (pointer:fine)'));
assert.ok(files(join(root,'src/pages')).every(p => p.endsWith('index.astro') || p.includes('workspace') || p.includes('pages\\me\\')), 'Only homepage, workspace and personal pages are approved');
console.log('Verified: homepage structure, local links/assets, content boundaries, responsive/motion rules, asset sizes.');

import { cpSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
const root=resolve(import.meta.dirname,'..');
for(const item of readdirSync(join(root,'dist'))){
 if(['src','public','scripts','node_modules','package.json','AGENTS.md'].includes(item)) throw new Error(`Unsafe output name: ${item}`);
 cpSync(join(root,'dist',item),join(root,item),{recursive:true});
}
console.log('Exported GitHub Pages files without deleting existing content.');

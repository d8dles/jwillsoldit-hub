import { readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const serverEntry = resolve(dist, 'server', 'entry-server.js');
const { render } = await import(pathToFileURL(serverEntry).href);

const routes = [
  { pathname: '/', outputPath: 'index.html' },
  { pathname: '/about', outputPath: 'about/index.html' },
  { pathname: '/rentals', outputPath: 'rentals/index.html' },
  { pathname: '/listings', outputPath: 'listings/index.html' },
  { pathname: '/listings/rentals', outputPath: 'listings/rentals/index.html' },
  {
    pathname: '/listings/rentals/4231-tulip-oak-dr',
    outputPath: 'listings/rentals/4231-tulip-oak-dr/index.html',
  },
];

for (const route of routes) {
  const outputFile = resolve(dist, route.outputPath);
  const template = await readFile(outputFile, 'utf8');
  const pageHtml = render(route.pathname);
  const html = template.replace('<div id="root"></div>', `<div id="root">${pageHtml}</div>`);

  if (html === template) {
    throw new Error(`Could not find the root mount point in ${route.outputPath}`);
  }

  await writeFile(outputFile, html);
  console.log(`prerendered ${route.pathname} -> ${route.outputPath}`);
}

await rm(resolve(dist, 'server'), { recursive: true, force: true });

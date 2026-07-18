/**
 * Fixes broken relative links and assets across all static demos.
 * Run: node scripts/fix-demo-links.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEMOS_ROOT = path.join(__dirname, "../public/demos");

const FAVICON = '/assets/logos/favicon.svg';
const SHARED_CSS = "/demos/demo-shared.css";
const SHARED_JS = "/demos/demo-shared.js";

function fixDemoHtml(slug, filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  const baseTag = `<base href="/demos/${slug}/">`;

  if (!html.includes("<base ")) {
    html = html.replace("<head>", `<head>\n  ${baseTag}`);
  } else {
    html = html.replace(/<base href="[^"]*">/, baseTag);
  }

  html = html.replace(
    /<link rel="icon"[^>]*href="[^"]*"[^>]*>/,
    `<link rel="icon" type="image/svg+xml" href="${FAVICON}">`,
  );

  html = html.replace(/href="\.\.\/demo-shared\.css"/g, `href="${SHARED_CSS}"`);
  html = html.replace(/src="\.\.\/demo-shared\.js"/g, `src="${SHARED_JS}"`);
  html = html.replace(/href="\.\.\/\.\.\/assets\/[^"]+"/g, `href="${FAVICON}"`);

  html = html.replace(
    /<a href="index\.html" class="demo-logo">/g,
    '<a href="#home" class="demo-logo">',
  );

  fs.writeFileSync(filePath, html, "utf8");
  console.log(`Fixed: ${slug}/index.html`);
}

const slugs = fs
  .readdirSync(DEMOS_ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const slug of slugs) {
  const indexPath = path.join(DEMOS_ROOT, slug, "index.html");
  if (fs.existsSync(indexPath)) {
    fixDemoHtml(slug, indexPath);
  }
}

console.log(`Done. Updated ${slugs.length} demos.`);

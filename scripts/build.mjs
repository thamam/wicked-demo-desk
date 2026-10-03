// Copies the site's web files into dist/ (what you would deploy).
import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = join(root, "dist");
const SKIP_DIRS = new Set([".git", "dist", "node_modules", "scripts", "test"]);
const WEB_FILE = /\.(html|css|js|mjs|svg|png|jpe?g|gif|webp|ico|woff2?)$/i;

function collect(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (!SKIP_DIRS.has(name)) files.push(...collect(path));
    } else if (WEB_FILE.test(name)) {
      files.push(path);
    }
  }
  return files;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const files = collect(root).map((path) => relative(root, path));
for (const file of files) cpSync(join(root, file), join(out, file));
console.log(`built ${files.length} files into dist/: ${files.join(", ")}`);

// Minimal static server for local viewing: npm start [-- <dir> <port>]
// Defaults: serves the project root on http://127.0.0.1:8095/
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const [dirArg = ".", portArg = "8095"] = process.argv.slice(2);
const root = fileURLToPath(new URL(`../${dirArg}/`, import.meta.url));
const port = Number(portArg);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const rel = normalize(pathname === "/" ? "/index.html" : pathname).replace(/^[/\\]+/, "");
  try {
    const body = await readFile(join(root, rel));
    res.writeHead(200, { "content-type": TYPES[extname(rel)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" }).end("not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`serving ${root} on http://127.0.0.1:${port}/`));

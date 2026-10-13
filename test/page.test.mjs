import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("page has the Demo Desk title", () => {
  assert.match(html, /<title>Demo Desk<\/title>/);
});

test("page has a main landmark", () => {
  assert.match(html, /<main[\s>]/);
});

test("page shows the Pilot connected line", () => {
  assert.match(html, /<p class="tagline">Pilot connected<\/p>/);
});

test("every local asset the page references exists", () => {
  const refs = [...html.matchAll(/(?:href|src)="([^"#:]+)"/g)].map((m) => m[1]);
  assert.ok(refs.length > 0, "expected at least one local asset");
  for (const ref of refs) {
    assert.ok(existsSync(new URL(`../${ref}`, import.meta.url)), `missing ${ref}`);
  }
});

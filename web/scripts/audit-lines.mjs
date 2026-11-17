#!/usr/bin/env node
/**
 * Line-count audit (HARD rule: no file > 200 lines).
 * Scans web/src + ai-service. Exit 1 when any file exceeds the limit.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = [join(process.cwd(), "src"), join(process.cwd(), "../ai-service")];
const SKIP = /node_modules|\.next|__pycache__/;
const over = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.test(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (/\.(ts|tsx|py|css)$/.test(entry)) {
      const lines = readFileSync(full, "utf8").split("\n").length;
      if (lines > 200) over.push(`${lines}\t${full.replace(process.cwd(), "")}`);
    }
  }
}

for (const root of ROOTS) {
  try { walk(root); } catch { /* root missing */ }
}

if (over.length) {
  console.error("OVER 200 LINES:\n" + over.join("\n"));
  process.exit(1);
}
console.log("Line rule OK — all files <= 200 lines.");

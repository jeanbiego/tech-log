import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const markdownFiles = [];
const ignoredDirs = new Set(["node_modules", ".git", "notes_private"]);
const ignoredFiles = new Set(["zenn_codex_instruction_final.md"]);
const errors = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(repoRoot, fullPath);
    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      walk(fullPath);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      if (ignoredFiles.has(entry.name)) continue;
      markdownFiles.push(relPath);
    }
  }
}

function countUnescaped(line, regex) {
  const matches = line.match(regex);
  return matches ? matches.length : 0;
}

function checkFile(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  const text = fs.readFileSync(fullPath, "utf8");
  const lines = text.split(/\r?\n/);

  let inCodeFence = false;
  let blockMathOpen = false;
  let blockMathOpenedAt = 0;

  lines.forEach((line, index) => {
    const lineNo = index + 1;
    if (/^\s*```/.test(line)) {
      inCodeFence = !inCodeFence;
      return;
    }
    if (inCodeFence) return;

    const blockCount = countUnescaped(line, /(?<!\\)\$\$/g);
    if (blockCount % 2 === 1) {
      if (!blockMathOpen) {
        blockMathOpen = true;
        blockMathOpenedAt = lineNo;
      } else {
        blockMathOpen = false;
        blockMathOpenedAt = 0;
      }
    }

    const stripped = line.replace(/(?<!\\)\$\$/g, "");
    const inlineCount = countUnescaped(stripped, /(?<!\\)\$(?!\$)/g);
    if (inlineCount % 2 === 1) {
      errors.push(`${relativePath}:${lineNo} - Unclosed inline math delimiter "$".`);
    }
  });

  if (blockMathOpen) {
    errors.push(
      `${relativePath}:${blockMathOpenedAt} - Unclosed block math delimiter "$$".`
    );
  }
}

walk(repoRoot);
markdownFiles.forEach(checkFile);

if (errors.length > 0) {
  console.error("Math delimiter check failed:");
  errors.forEach((err) => console.error(`- ${err}`));
  process.exit(1);
}

console.log(`Math delimiter check passed (${markdownFiles.length} markdown files).`);

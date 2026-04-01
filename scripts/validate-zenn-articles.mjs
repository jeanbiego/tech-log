import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = process.cwd();
const articlesDir = path.join(repoRoot, "articles");
const args = process.argv.slice(2);
const errors = [];

let againstRange = null;
let failOnPublishedRename = false;

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === "--against") {
    againstRange = args[i + 1] ?? null;
    i += 1;
    continue;
  }
  if (arg === "--fail-on-published-rename") {
    failOnPublishedRename = true;
    continue;
  }
  errors.push(`Unknown argument: ${arg}`);
}

if (failOnPublishedRename && !againstRange) {
  errors.push("--fail-on-published-rename requires --against <git-range>.");
}

const officialSlugPattern = /^[a-z0-9_-]{12,50}$/;
const howtoSlugPattern = /^howto-[a-z0-9]+(?:-[a-z0-9]+)+$/;
const paperSlugPattern = /^paper-[a-z0-9]+-[0-9]{4}-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const reproSlugPattern = /^repro-[a-z0-9]+(?:-[a-z0-9]+)+$/;

function isOfficialSlug(slug) {
  return officialSlugPattern.test(slug);
}

function isFinalSlug(slug) {
  return (
    howtoSlugPattern.test(slug) ||
    paperSlugPattern.test(slug) ||
    reproSlugPattern.test(slug)
  );
}

function isValidFinalSlug(slug) {
  return isOfficialSlug(slug) && isFinalSlug(slug);
}

function parseFrontMatter(text, label) {
  const frontMatterMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontMatterMatch) {
    errors.push(`${label} - Front matter is required and must start at byte 0.`);
    return null;
  }

  const publishedMatch = frontMatterMatch[1].match(
    /^published:\s*(?:["'])?(true|false)(?:["'])?\s*$/m
  );
  if (!publishedMatch) {
    errors.push(`${label} - Front matter must define published: true|false.`);
    return null;
  }

  return {
    published: publishedMatch[1] === "true",
  };
}

function validateArticleFile(entry) {
  const fullPath = path.join(articlesDir, entry);
  const relPath = path.relative(repoRoot, fullPath);
  const slug = path.basename(entry, ".md");
  const buffer = fs.readFileSync(fullPath);
  const text = buffer.toString("utf8");

  if (buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
    errors.push(`${relPath} - UTF-8 BOM is not allowed; Zenn may fail to detect front matter.`);
  }

  const frontMatter = parseFrontMatter(text, relPath);
  if (!frontMatter) return;

  if (slug.startsWith("_draft-")) {
    const proposedSlug = slug.slice("_draft-".length);
    if (!isValidFinalSlug(proposedSlug)) {
      errors.push(
        `${relPath} - Preview articles must use _draft-<final-slug> where final slug is 12-50 chars and matches howto-*, paper-*, or repro-*.` 
      );
    }
    if (frontMatter.published) {
      errors.push(`${relPath} - Preview articles must keep published: false.`);
    }
    return;
  }

  if (!isValidFinalSlug(slug)) {
    errors.push(
      `${relPath} - Published article filenames must use a 12-50 char final slug: howto-*, paper-*, or repro-*.` 
    );
  }
}

function runGit(commandArgs) {
  try {
    return execFileSync("git", commandArgs, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    const stderr = error.stderr?.toString().trim();
    const detail = stderr ? ` (${stderr})` : "";
    errors.push(`git ${commandArgs.join(" ")} failed${detail}.`);
    return "";
  }
}

function parsePublishedFromGit(ref, relPath) {
  const gitPath = relPath.split(path.sep).join("/");
  const blob = runGit(["show", `${ref}:${gitPath}`]);
  if (!blob) return null;
  const frontMatter = parseFrontMatter(blob, `${ref}:${gitPath}`);
  return frontMatter?.published ?? null;
}

function resolveBaseRef(rangeSpec) {
  if (rangeSpec.includes("...")) {
    const [leftRef, rightRef] = rangeSpec.split("...");
    const mergeBase = runGit(["merge-base", leftRef, rightRef || "HEAD"]);
    return mergeBase || null;
  }
  if (rangeSpec.includes("..")) {
    return rangeSpec.split("..")[0] || null;
  }
  return null;
}

function validatePublishedSlugRenames(rangeSpec) {
  const baseRef = resolveBaseRef(rangeSpec);
  if (!baseRef) {
    errors.push(`Could not determine base ref from range: ${rangeSpec}`);
    return;
  }

  const diffOutput = runGit([
    "diff",
    "--name-status",
    "--find-renames",
    rangeSpec,
    "--",
    "articles",
  ]);

  if (!diffOutput) return;

  const lines = diffOutput.split(/\r?\n/).filter(Boolean);
  for (const line of lines) {
    const parts = line.split("\t");
    const status = parts[0] ?? "";
    let oldPath = null;
    let newPath = null;

    if (status.startsWith("R")) {
      oldPath = parts[1];
      newPath = parts[2];
    } else if (status === "D") {
      oldPath = parts[1];
    } else {
      continue;
    }

    if (!oldPath?.endsWith(".md")) continue;
    if (path.posix.basename(oldPath) === ".keep") continue;

    const oldPublished = parsePublishedFromGit(baseRef, oldPath);
    if (!oldPublished) continue;

    if (status.startsWith("R")) {
      errors.push(
        `${oldPath} -> ${newPath} - Renaming a published article changes its Zenn slug and creates a second article. Keep the published slug stable after first publish.`
      );
      continue;
    }

    errors.push(
      `${oldPath} - Removing a published article file from the repository breaks slug continuity on Zenn. If you intended a slug change, keep the old published file path stable and handle Zenn-side cleanup separately.`
    );
  }
}

if (!fs.existsSync(articlesDir)) {
  errors.push("articles directory does not exist.");
} else {
  const articleEntries = fs
    .readdirSync(articlesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== ".keep")
    .map((entry) => entry.name)
    .sort();

  articleEntries.forEach(validateArticleFile);
}

if (againstRange && failOnPublishedRename) {
  validatePublishedSlugRenames(againstRange);
}

if (errors.length > 0) {
  console.error("Zenn article validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Zenn article validation passed.");

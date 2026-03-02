import type { Lang } from "@/contexts/LanguageContext";

export type { Lang };

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  content: string;
  /** The language this content is actually in (may differ from requested if fallback was used) */
  lang: Lang;
  /** Which languages are available for this slug */
  availableLangs: Lang[];
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  if (!raw.startsWith("---")) {
    return { meta: {}, content: raw };
  }
  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { meta: {}, content: raw };
  }
  const fmStr = raw.slice(4, end).trim();
  const content = raw.slice(end + 4).trim();
  const meta: Record<string, string> = {};
  for (const line of fmStr.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  }
  return { meta, content };
}

function slugFromPath(path: string): string {
  return path.split("/").pop()?.replace(/\.(pl|en)\.md$/, "") ?? "";
}

// Eagerly import all .md files from blog/ — includes *.pl.md and *.en.md
const allModules = import.meta.glob("../../blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const plModules = Object.fromEntries(
  Object.entries(allModules).filter(([p]) => p.endsWith(".pl.md"))
);
const enModules = Object.fromEntries(
  Object.entries(allModules).filter(([p]) => p.endsWith(".en.md"))
);

// All unique slugs across both languages
const allSlugs = Array.from(
  new Set([
    ...Object.keys(plModules).map(slugFromPath),
    ...Object.keys(enModules).map(slugFromPath),
  ])
);

function buildPost(slug: string, lang: Lang): PostMeta | null {
  const primary = lang === "pl" ? plModules : enModules;
  const fallback = lang === "pl" ? enModules : plModules;

  const primaryPath = Object.keys(primary).find((p) => slugFromPath(p) === slug);
  const fallbackPath = Object.keys(fallback).find((p) => slugFromPath(p) === slug);

  const raw = primaryPath ? primary[primaryPath] : fallbackPath ? fallback[fallbackPath] : null;
  if (!raw) return null;

  const actualLang: Lang = primaryPath ? lang : lang === "pl" ? "en" : "pl";

  const availableLangs: Lang[] = [];
  if (Object.keys(plModules).some((p) => slugFromPath(p) === slug)) availableLangs.push("pl");
  if (Object.keys(enModules).some((p) => slugFromPath(p) === slug)) availableLangs.push("en");

  const { meta, content } = parseFrontmatter(raw);

  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? "",
    excerpt: meta.excerpt ?? "",
    tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()) : [],
    readingTime: meta.readingTime ?? "",
    content,
    lang: actualLang,
    availableLangs,
  };
}

export function getAllPosts(lang: Lang): PostMeta[] {
  return allSlugs
    .map((slug) => buildPost(slug, lang))
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string, lang: Lang): PostMeta | undefined {
  return buildPost(slug, lang) ?? undefined;
}

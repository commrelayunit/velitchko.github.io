import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import type { PortfolioLink, PortfolioLinkKind, PortfolioMedia, PortfolioProject } from "@/data/portfolio";

const portfolioProjectsDirectory = path.join(process.cwd(), "data/portfolio-projects");

const linkKinds: PortfolioLinkKind[] = ["project", "publication", "repository", "demo"];
const statuses = ["ongoing", "completed", "research"] as const;

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    const string = asString(item);
    return string ? [string] : [];
  });
}

function parseLinks(value: unknown): PortfolioLink[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const label = asString(record.label);
    const url = asString(record.url);
    const kind = asString(record.kind);

    if (!label || !url) return [];
    return [{ label, url, kind: linkKinds.includes(kind as PortfolioLinkKind) ? kind as PortfolioLinkKind : "project" }];
  });
}

function parseMedia(value: unknown): PortfolioMedia[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const media = value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const src = asString(record.src);
    const alt = asString(record.alt);
    const caption = asString(record.caption);
    const type = asString(record.type);

    if (!src || !alt || !src.startsWith("/")) return [];
    const mediaItem: PortfolioMedia = { src, alt };
    if (caption) mediaItem.caption = caption;
    if (type === "image" || type === "gif") mediaItem.type = type;
    return [mediaItem];
  });

  return media.length ? media : undefined;
}

async function renderProjectMarkdown(markdown: string): Promise<string> {
  // Deliberately omit allowDangerousHtml: raw HTML remains text rather than
  // becoming executable/unsafe markup in the static site.
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return processed.toString();
}

async function getPortfolioProjectByFileName(fileName: string): Promise<PortfolioProject | null> {
  const fullPath = path.join(portfolioProjectsDirectory, fileName);
  const slug = fileName.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  const title = asString(data.title);
  const blurb = asString(data.blurb);
  const order = typeof data.order === "number" && Number.isFinite(data.order) ? data.order : undefined;
  const links = parseLinks(data.links);

  if (!title || !blurb || order === undefined || !links.length) {
    console.warn(`Skipping invalid portfolio project: ${fileName}`);
    return null;
  }

  const status = asString(data.status);
  const contentHtml = await renderProjectMarkdown(content);

  return {
    slug,
    title,
    blurb,
    order,
    links,
    tags: asStringArray(data.tags),
    ...(asString(data.date) ? { date: asString(data.date) } : {}),
    ...(asString(data.abstract) ? { abstract: asString(data.abstract) } : {}),
    ...(asString(data.role) ? { role: asString(data.role) } : {}),
    ...(asStringArray(data.collaborators).length ? { collaborators: asStringArray(data.collaborators) } : {}),
    ...(statuses.includes(status as (typeof statuses)[number]) ? { status: status as PortfolioProject["status"] } : {}),
    ...(asStringArray(data.outcomes).length ? { outcomes: asStringArray(data.outcomes) } : {}),
    ...(typeof data.featured === "boolean" ? { featured: data.featured } : {}),
    ...(parseMedia(data.media) ? { media: parseMedia(data.media) } : {}),
    contentHtml,
  };
}

/** Read case studies from Markdown files during static generation. */
export async function getAllPortfolioProjects(): Promise<PortfolioProject[]> {
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(portfolioProjectsDirectory)
      .filter((fileName) => fileName.endsWith(".md"));
  } catch (error) {
    console.error("Error reading portfolio projects:", error);
    return [];
  }

  const projects = await Promise.all(fileNames.map(getPortfolioProjectByFileName));
  return projects
    .filter((project): project is PortfolioProject => project !== null)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

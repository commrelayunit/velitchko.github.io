/**
 * Types for Markdown-backed portfolio case studies.
 *
 * Author project records in data/portfolio-projects/*.md. The parser in
 * lib/portfolio.ts reads those files at build time for both the web page and
 * its printable brochure layout.
 */
export type PortfolioLinkKind = "project" | "publication" | "repository" | "demo";

export type PortfolioLink = {
  label: string;
  url: string;
  kind: PortfolioLinkKind;
};

export type PortfolioMedia = {
  src: string;
  alt: string;
  caption?: string;
  type?: "image" | "gif";
};

export type PortfolioProject = {
  slug: string;
  title: string;
  date?: string;
  blurb: string;
  abstract?: string;
  role?: string;
  collaborators?: string[];
  tags: string[];
  status?: "ongoing" | "completed" | "research";
  outcomes?: string[];
  links: PortfolioLink[];
  media?: PortfolioMedia[];
  featured?: boolean;
  order: number;
  contentHtml: string;
};

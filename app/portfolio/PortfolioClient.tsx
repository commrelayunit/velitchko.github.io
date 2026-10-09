"use client";

import { useState } from "react";
import type { PortfolioProject } from "@/data/portfolio";

function ProjectMedia({ project }: { project: PortfolioProject }) {
  if (!project.media?.length) {
    return (
      <div className="portfolio-media-placeholder" aria-label={`Media placeholder for ${project.title}`}>
        <span className="text-4xl" aria-hidden="true">▧</span>
        <p>Project media to be added</p>
        <small>Add a local image or GIF in <code>public/portfolio/</code> and its alt text in <code>data/portfolio-projects/{project.slug}.md</code>.</small>
      </div>
    );
  }

  return (
    <div className="portfolio-media-grid">
      {project.media.map((media) => (
        <figure key={media.src}>
          {/* Native img keeps static export and local GIFs simple. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- local images/GIFs stay compatible with static export */}
          <img src={media.src} alt={media.alt} />
          {media.caption && <figcaption>{media.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

export default function PortfolioClient({ projects }: { projects: PortfolioProject[] }) {
  const [activeProject, setActiveProject] = useState(projects[0]?.slug);

  const jumpTo = (slug: string) => {
    setActiveProject(slug);
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="portfolio-page">
      <section className="portfolio-cover print-page">
        <p className="portfolio-eyebrow"><span className="retro-only">[selected_work.exe]</span><span className="pro-only">Selected work</span></p>
        <h1>Projects that make complex systems easier to see, explore, and discuss.</h1>
        <p className="portfolio-lede">A working portfolio of research and applied projects across visual analytics, network visualization, and collaborative data exploration.</p>
        <div className="portfolio-cover-actions no-print">
          <button className="retro-button" onClick={() => window.print()} type="button"><span className="retro-only">PRINT / SAVE PDF</span><span className="pro-only">Print / save as PDF</span></button>
          <a href="#case-studies" className="portfolio-text-link">Browse case studies ↓</a>
        </div>
        <p className="portfolio-print-note print-only">Portfolio · Velitchko Filipov · Visualization Researcher</p>
      </section>

      <div className="portfolio-shell">
        <aside className="portfolio-quick-nav no-print" aria-label="Portfolio projects">
          <div>
            <p className="portfolio-nav-label">Quick navigation</p>
            <ol>
              {projects.map((project, index) => (
                <li key={project.slug}>
                  <button className={activeProject === project.slug ? "is-active" : ""} type="button" onClick={() => jumpTo(project.slug)} aria-current={activeProject === project.slug ? "location" : undefined}>
                    <span>{String(index + 1).padStart(2, "0")}</span>{project.title}
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <button className="portfolio-print-button" type="button" onClick={() => window.print()}>Print portfolio</button>
        </aside>

        <main id="case-studies" className="portfolio-case-studies" aria-label="Portfolio case studies">
          {projects.map((project, index) => (
            <article className="portfolio-case-study print-page" id={project.slug} key={project.slug} tabIndex={-1}>
              <div className="portfolio-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="portfolio-case-content">
                <header>
                  <div className="portfolio-meta"><span>{project.status ?? "project"}</span>{project.date && <span>{project.date}</span>}</div>
                  <h2>{project.title}</h2>
                  <p className="portfolio-blurb">{project.blurb}</p>
                </header>
                <ProjectMedia project={project} />
                <div className="portfolio-details">
                  <section>
                    <h3>Project note</h3>
                    {project.abstract ? <p>{project.abstract}</p> : <p>Case-study abstract to be added. This seed entry is intentionally limited to verified project copy already present on this website.</p>}
                  </section>
                  {project.contentHtml && <section className="portfolio-markdown" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />}
                  {project.role && <section><h3>Contribution</h3><p>{project.role}</p></section>}
                  {project.collaborators?.length && <section><h3>Collaborators</h3><p>{project.collaborators.join(", ")}</p></section>}
                  {project.outcomes?.length && <section><h3>Outcomes</h3><ul>{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section>}
                </div>
                <footer className="portfolio-case-footer">
                  <div className="portfolio-tags" aria-label="Project tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="portfolio-links">{project.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">↗</span><span className="print-url"> · {link.url}</span></a>)}</div>
                </footer>
              </div>
            </article>
          ))}

          <section className="portfolio-outro print-page" aria-labelledby="portfolio-contact-title">
            <p className="portfolio-eyebrow">Let&apos;s make something legible</p>
            <h2 id="portfolio-contact-title">Interested in a research collaboration or visualization project?</h2>
            <p>I work on visual analytics, network visualization, visualization literacy, and collaborative ways of engaging with complex data.</p>
            <div className="portfolio-contact-links">
              <a href="mailto:velitchko.filipov@tuwien.ac.at">velitchko.filipov@tuwien.ac.at</a>
              <a href="https://github.com/velitchko">github.com/velitchko</a>
              <a href="https://www.linkedin.com/in/velitchko-filipov">linkedin.com/in/velitchko-filipov</a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

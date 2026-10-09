export type PortfolioLink = {
  label: string;
  url: string;
  kind: "project" | "publication" | "repository" | "demo";
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
};

/**
 * Portfolio source of truth for both the interactive route and its print view.
 * Keep claims grounded in linked project material. Entries without an abstract,
 * media, role, or outcomes deliberately render as editable placeholders.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "artvis",
    title: "ArtVis",
    blurb: "A network visualization system for complex interactions among persons, objects, places, institutions, and events in art history over time.",
    tags: ["Dynamic Networks", "Digital Humanities", "Art History"],
    status: "research",
    links: [{ label: "Project site", url: "https://artvis.cvast.tuwien.ac.at/", kind: "project" }],
    featured: true,
    order: 1,
  },
  {
    slug: "sane",
    title: "SANE",
    blurb: "A visual analytics framework for event-based information diffusion with uncertainty across dynamic networks such as pandemics and misinformation campaigns.",
    tags: ["Dynamic Networks", "Diffusion Processes", "Uncertainty"],
    status: "research",
    links: [{ label: "Project site", url: "https://www.cvast.tuwien.ac.at/projects/sane", kind: "project" }],
    featured: true,
    order: 2,
  },
  {
    slug: "timelighting",
    title: "TimeLighting",
    blurb: "An interactive visual analytics tool for temporal networks that projects node trajectories and edge surfaces from 3D space-time cubes to 2D.",
    tags: ["Dynamic Networks", "Event-Based Graphs", "Projections"],
    status: "completed",
    links: [{ label: "Repository", url: "https://github.com/velitchko/timelighting", kind: "repository" }],
    order: 3,
  },
  {
    slug: "polycube",
    title: "PolyCube",
    blurb: "A space-time cube visualization method for exploring cultural heritage data by integrating spatial and temporal information.",
    tags: ["Space-Time Cube", "Cultural Heritage", "Cognitive Science"],
    status: "research",
    links: [{ label: "Project site", url: "https://bigdata-vis.github.io/polycube/combined", kind: "project" }],
    order: 4,
  },
  {
    slug: "immv",
    title: "IMMV",
    blurb: "An interactive visual analytics platform that explores music as an urban identification tool and makes the interaction between music and urban texture accessible.",
    tags: ["Visual Analytics", "Musicology", "Cultural Heritage"],
    status: "completed",
    links: [{ label: "Repository", url: "https://github.com/velitchko/interactive-music-mapping-vienna", kind: "repository" }],
    order: 5,
  },
  {
    slug: "visgames",
    title: "VisGames",
    blurb: "A workshop advancing data visualization games as tools for communication, co-creation, and collaborative problem-solving beyond education.",
    tags: ["Visualization Activities", "Collaboration", "Co-Creation"],
    status: "ongoing",
    links: [{ label: "Workshop site", url: "https://visgames.netlify.app/", kind: "project" }],
    order: 6,
  },
  {
    slug: "cv3",
    title: "CV3",
    blurb: "An interactive exploration environment for recruiters to explore, assess, and compare multiple CVs simultaneously.",
    tags: ["Visual Analytics", "Comparison", "Human Resources"],
    status: "completed",
    links: [{ label: "Repository", url: "https://github.com/velitchko/cvthree", kind: "repository" }],
    order: 7,
  },
  {
    slug: "refhub",
    title: "RefHub",
    blurb: "A reference-management platform for organizing academic publications, building citation networks, and sharing research collections.",
    tags: ["Reference Management", "Productivity", "Knowledge Graphs"],
    status: "ongoing",
    links: [{ label: "Project site", url: "https://refhub.io/", kind: "project" }],
    order: 8,
  },
];

export const sortedPortfolioProjects = [...portfolioProjects].sort((a, b) => a.order - b.order);

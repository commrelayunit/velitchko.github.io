import { getAllPortfolioProjects } from "@/lib/portfolio";
import PortfolioClient from "./PortfolioClient";

export default async function PortfolioPage() {
  const projects = await getAllPortfolioProjects();
  return <PortfolioClient projects={projects} />;
}

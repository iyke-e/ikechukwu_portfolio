"use client";

import FilterNav from "@/components/portfolio/FilterNav";
import ProjectsDisplay from "@/components/portfolio/ProjectsDisplay";
import PagesHero from "@/components/ui/PagesHero";
import { project } from "@/data/project";
import React, { useState } from "react";

const Portfolio = () => {
  const [acitveFilter, setActiveFilter] = useState("All");

  const filterResult =
    acitveFilter === "All"
      ? project
      : project.filter((item) => item.projectType.includes(acitveFilter));
  return (
    <div className="">
      <PagesHero
        title="Portfolio."
        subtitle="A collection of web and mobile projects showcasing clean code,
          responsive design, and seamless user experiences"
      />

      <ProjectsDisplay project={filterResult} />
    </div>
  );
};

export default Portfolio;

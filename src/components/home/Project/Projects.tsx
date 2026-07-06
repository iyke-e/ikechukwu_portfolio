"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import FilterNav from "@/components/portfolio/FilterNav";
import ProjectsDisplay from "@/components/portfolio/ProjectsDisplay";
import { project } from "@/data/project";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Featured Mobile Apps
  const featuredMobile = project.filter((item) => item.featured && item.category === "mobile");

  // Featured Web Apps
  const featuredWeb = project.filter((item) => item.featured && item.category === "web");
  
  // Other projects (everything not featured)
  const otherProjects = project.filter((item) => !item.featured);

  const filteredOthers =
    activeFilter === "All"
      ? otherProjects
      : activeFilter === "Web Apps"
      ? otherProjects.filter((item) => item.category === "web")
      : activeFilter === "Mobile Apps"
      ? otherProjects.filter((item) => item.category === "mobile")
      : otherProjects;

  return (
    <div id="portfolio" className="py-10 border-t border-white/10">
      {/* Featured Mobile Projects Section */}
      <SectionHeader title="Featured App Projects" subtitle="Core Mobile Applications" />
      <ProjectsDisplay project={featuredMobile} projectsPerPage={3} isFeatured={true} />

      {/* Featured Web Projects Section */}
      <div className="mt-20 border-t border-white/5 pt-16">
        <SectionHeader title="Featured Web Projects" subtitle="Core Web Applications" />
        <ProjectsDisplay project={featuredWeb} projectsPerPage={1} isFeatured={true} />
      </div>

      {/* Other Projects Section */}
      <div className="mt-20 border-t border-white/5 pt-16">
        <SectionHeader title="More Projects" subtitle="Web & Companion Apps Portfolio" />
        
        <div className="flex justify-center my-8 pad-auto">
          <FilterNav acitveFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </div>

        <ProjectsDisplay project={filteredOthers} projectsPerPage={2} />
      </div>
    </div>
  );
};

export default Projects;

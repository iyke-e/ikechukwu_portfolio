import React from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import FeaturedProjects from "./FeaturedProjects";

const Projects = () => {
  return (
    <div className="py-10">
      <SectionHeader title="Feature Projects" subtitle="Recent Case Studies" />

      <FeaturedProjects />

      <div className="grid mt-6 place-content-center">
        <Link href="/portfolio">
          <Button variant="white">See All project</Button>
        </Link>
      </div>
    </div>
  );
};

export default Projects;

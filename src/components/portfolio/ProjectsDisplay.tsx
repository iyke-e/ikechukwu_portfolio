import React, { useEffect, useState } from "react";
import { ProjectCard } from "../home/Project/FeaturedProjects";
import ProjectDetailModal from "./ProjectDetailModal";
import { ProjectProp } from "@/data/project";

const ProjectsDisplay = ({ project }: { project: ProjectProp[] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectProp | null>(
    null
  );
  const [docBody, setDocBody] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setDocBody(document.body);
  }, []);

  const toggleScroll = (enable?: boolean) => {
    if (!docBody) return;
    docBody.classList.toggle(
      "stop-scroll",
      enable ?? !docBody.classList.contains("stop-scroll")
    );
  };

  const handleOpenModal = (item: ProjectProp) => {
    setSelectedProject(item);
    setOpenModal(true);
    toggleScroll(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    toggleScroll(false);
  };

  return (
    <div className="">
      <div>
        {project.map((item, index) => (
          <div
            key={index}
            className={
              index === project.length - 1
                ? ""
                : "border-b border-foreground/20"
            }
          >
            <ProjectCard
              liveUrl={item.liveUrl}
              stack={item.stack}
              title={item.name}
              description={item.description}
              imagebg={item.imageUrl}
            />
          </div>
        ))}
      </div>
      <ProjectDetailModal
        isOpen={openModal}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectsDisplay;

import React, { useEffect, useState, useRef } from "react";
import { ProjectCard } from "../home/Project/FeaturedProjects";
import ProjectDetailModal from "./ProjectDetailModal";
import { ProjectProp } from "@/data/project";
import Button from "../ui/Button";

const ProjectsDisplay = ({
  project,
  projectsPerPage = 2,
  isFeatured = false,
}: {
  project: ProjectProp[];
  projectsPerPage?: number;
  isFeatured?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectProp | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [project]);

  useEffect(() => {
    if (openModal) {
      document.body.classList.add("stop-scroll");
    } else {
      document.body.classList.remove("stop-scroll");
    }
    return () => {
      document.body.classList.remove("stop-scroll");
    };
  }, [openModal]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (containerRef.current) {
      const topOffset = containerRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  }, [currentPage]);

  const handleOpenModal = (item: ProjectProp) => {
    setSelectedProject(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Pagination math
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const displayedProjects = isFeatured
    ? project
    : project.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(project.length / projectsPerPage);

  return (
    <div ref={containerRef} className="">
      <div>
        {displayedProjects.map((item, index) => (
          <div
            key={item.name}
            className={
              index === displayedProjects.length - 1
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
              onReadMore={() => handleOpenModal(item)}
              category={item.category}
            />
          </div>
        ))}
      </div>

      {!isFeatured && totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-10 pad-auto pb-10">
          <Button
            variant="white"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            className="disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold px-4 py-2"
          >
            Previous
          </Button>
          <span className="text-sm font-semibold text-white/70">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="white"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            className="disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold px-4 py-2"
          >
            Next
          </Button>
        </div>
      )}

      <ProjectDetailModal
        isOpen={openModal}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectsDisplay;

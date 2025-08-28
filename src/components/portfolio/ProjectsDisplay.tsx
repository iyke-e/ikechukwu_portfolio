import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';
import { ProjectProp } from '@/data/project';

const ProjectsDisplay = ({ project }: { project: ProjectProp[] }) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectProp | null>(null);

    const [docBody, setDocBody] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setDocBody(document.body);
    }, []);

    const toggleScroll = () => {
        if (!docBody) return;
        docBody.classList.toggle("stop-scroll");
        console.log(docBody)
    };
    const handleOpenModal = (item: ProjectProp) => {
        setSelectedProject(item);
        setOpenModal(true);
        toggleScroll()
    };

    return (
        <div className="py-5 mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {project?.map((item, index) => (
                <ProjectCard key={index} item={item} onClick={() => handleOpenModal(item)} />
            ))}

            <ProjectDetailModal
                isOpen={openModal}
                onClose={() => { setOpenModal(false), toggleScroll() }}
                project={selectedProject}
            />
        </div>
    );
};

export default ProjectsDisplay;

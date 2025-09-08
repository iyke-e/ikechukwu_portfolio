"use client"
import React, { useEffect, useState } from 'react'
import { project } from '@/data/project';
import MobileProjectAnimatedSection from './MobileProjectAnimatedSection';
import DesktopProjectAnimatedSection from './DesktopProjectAnimatedSection';

const ProjectAnimatedSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animateNext, setAnimateNext] = useState(false);
    const featuredProjects = project.filter(item => item.featured).slice(0, 4)

    const nextIndex = (activeIndex + 1) % featuredProjects.length;
    const nextNextIndex = (nextIndex + 1) % featuredProjects.length;

    // Animation and auto-switch
    useEffect(() => {
        const animateTimeout = setTimeout(() => {
            setAnimateNext(true); // trigger animation at 5s
        }, 5500);

        const switchTimeout = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % featuredProjects.length); // switch project at 6s
            setAnimateNext(false); // reset animation
        }, 6000); // always update css time to match this

        return () => {
            clearTimeout(animateTimeout);
            clearTimeout(switchTimeout);
        };
    }, [activeIndex]);

    const handleProjectClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div>
            <MobileProjectAnimatedSection project={featuredProjects} handleProjectClick={handleProjectClick} nextNextIndex={nextNextIndex} activeIndex={activeIndex} animateNext={animateNext} nextIndex={nextIndex} />
            <DesktopProjectAnimatedSection project={featuredProjects} handleProjectClick={handleProjectClick} nextNextIndex={nextNextIndex} activeIndex={activeIndex} animateNext={animateNext} nextIndex={nextIndex} />
        </div>

    );
};

export default ProjectAnimatedSection


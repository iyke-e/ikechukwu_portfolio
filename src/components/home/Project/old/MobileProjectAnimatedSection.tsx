import Button from '@/components/ui/Button'
import { ProjectProp } from '@/data/project'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaGithub } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu"

interface MobileProjectAnimatedSectionProp {
    activeIndex: number;
    nextIndex: number;
    nextNextIndex: number;
    animateNext: Boolean;
    project: ProjectProp[];
    handleProjectClick: (index: number) => void;
}

const MobileProjectAnimatedSection = ({
    project,
    activeIndex,
    nextIndex,
    nextNextIndex,
    animateNext,
    handleProjectClick
}: MobileProjectAnimatedSectionProp) => {

    const [touchStartX, setTouchStartX] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
        setDragging(true);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!dragging) return;
        const touchX = e.targetTouches[0].clientX;
        const deltaX = touchX - touchStartX;
        setCurrentTranslate(deltaX);
    };

    const onTouchEnd = () => {
        if (!dragging) return;
        setDragging(false);

        if (currentTranslate < -minSwipeDistance) {
            // Swipe left → next project
            handleProjectClick(nextIndex);
        } else if (currentTranslate > minSwipeDistance) {
            // Swipe right → previous project
            const prevIndex = activeIndex === 0 ? project.length - 1 : activeIndex - 1;
            handleProjectClick(prevIndex);
        }

        setCurrentTranslate(0);
    };

    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);
    return (
        <div className="md:hidden py-8">
            <div
                className="relative overflow-hidden h-130"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Active Card */}
                <div
                    className={`${animateNext ? "slideOutLeft" : ""} top-0 absolute w-full`}
                    style={{
                        transform: `translateX(${dragging ? currentTranslate : 0}px)`,
                        transition: dragging ? 'none' : undefined
                    }}
                >
                    <div
                        style={{ backgroundImage: `url(${project[activeIndex]?.imageUrl})` }}
                        className="bg-cover h-60 bg-center"
                    />
                    <div className="flex flex-col pad-auto justify-between gap-8 py-10">
                        <div>
                            <ul className='flex items-center justify-end gap-4 cursor-pointer'>
                                <li>
                                    <a target='_blank' href={project[activeIndex].sourceUrl} className='flex items-center gap-4'>
                                        <FaGithub className='w-8 h-8' />
                                    </a>
                                </li>
                                <li>
                                    <a target='_blank' href={project[activeIndex].liveUrl} className='flex items-center gap-4'>
                                        <LuExternalLink className="w-8 h-8 hover:scale-110 transition" />
                                    </a>
                                </li>
                            </ul>
                            <p className="text-white mb-2"> Featured Project</p>
                            <h2 className="text-3xl line-clamp-1 font-semibold mb-2">
                                {project[activeIndex].name}
                            </h2>
                            <p className='line-clamp-2'>{project[activeIndex].description}</p>
                        </div>
                        <div>
                            <Link href="/">
                                <Button>Read More</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Next Card */}
                <div
                    className={`${animateNext ? "slideInRight" : ""} opacity-0 top-0 absolute w-full`}
                    style={{
                        transform: `translateX(${dragging ? screenWidth + currentTranslate : 0}px)`,
                        transition: dragging ? 'none' : undefined
                    }}
                >
                    <div
                        style={{ backgroundImage: `url(${project[nextIndex]?.imageUrl})` }}
                        className="bg-cover h-60 bg-center"
                    />
                    <div className="flex flex-col pad-auto justify-between gap-8 py-10">
                        <div>
                            <ul className='flex items-center justify-end gap-4 cursor-pointer'>
                                <li>
                                    <a target='_blank' href={project[nextIndex].sourceUrl} className='flex items-center gap-4'>
                                        <FaGithub className='w-8 h-8' />
                                    </a>
                                </li>
                                <li>
                                    <a target='_blank' href={project[nextIndex].liveUrl} className='flex items-center gap-4'>
                                        <LuExternalLink className="w-8 h-8 hover:scale-110 transition" />
                                    </a>
                                </li>
                            </ul>
                            <p className="text-white mb-2"> Featured Project</p>
                            <h2 className="text-3xl line-clamp-1 font-semibold mb-2">
                                {project[nextIndex].name}
                            </h2>
                            <p className='line-clamp-2'>{project[nextIndex].description}</p>
                        </div>
                        <div>
                            <Link href="/">
                                <Button>Read More</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Next-next Card (preload offscreen) */}
                <div
                    className="opacity-0 top-0 absolute w-full"
                    style={{
                        transform: `translateX(${screenWidth}px)`,
                        backgroundImage: `url(${project[nextNextIndex]?.imageUrl})`
                    }}
                >
                    <div className="bg-cover h-60 bg-center" />
                </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex pad-auto w-full gap-2">
                {project.map((_, index) => (
                    <div
                        key={index}
                        className={`${activeIndex === index ? "w-full" : "w-12"} mt-4 outline outline-white/20 grid rounded-full h-[0.25px]`}
                    >
                        <div className={`${activeIndex === index ? "loading" : ""} bg-white w-0 rounded-full`}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MobileProjectAnimatedSection;

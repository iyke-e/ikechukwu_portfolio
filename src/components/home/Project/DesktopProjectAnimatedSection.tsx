import { ProjectProp } from '@/data/project';
import { FaGithub } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu"


import React from 'react'
import Link from 'next/link';
import Button from '@/components/ui/Button';



interface DesktopProjectAnimatedSectionProp {
    activeIndex: number;
    nextIndex: number;
    animateNext: Boolean;
    nextNextIndex: number;
    project: ProjectProp[];
    handleProjectClick: (index: number) => void
}

const DesktopProjectAnimatedSection = ({ project, activeIndex, nextIndex, animateNext, nextNextIndex, handleProjectClick }: DesktopProjectAnimatedSectionProp) => {


    return (
        <div className=" hidden lg:block relative overflow-hidden pad-auto py-4 md:py-10 text-white">

            <div className="hidden md:block">
                <div className="flex items-end">
                    <div className="grid grid-cols-2 h-80  gap-6">
                        <div className="flex flex-col justify-between gap-4  py-10">

                            <div>
                                <p className="text-white mb-2">Featured Project</p>

                                <h2 className="text-4xl mb-3">
                                    {project[activeIndex].name}
                                </h2>
                                <p >{project[activeIndex].description}</p>
                            </div>
                            <div>


                                <Link href="/">
                                    <Button>Read More</Button>
                                </Link>
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
                            </div>
                        </div>

                        <div
                            style={{
                                backgroundImage: `url(${project[activeIndex]?.imageUrl})`,
                            }}
                            className="bg-cover bg-no-repeat bg-top-left"
                        />
                    </div>

                    <div>
                        <div className="grid gap-1 px-2 mb-2">
                            <p className="text-[10px]">Up Next</p>
                            <p className='text-xs line-clamp-1'>{project[nextIndex].name}</p>
                        </div>

                        <div className="h-25 w-30 relative isolate">
                            <img
                                className={`${animateNext ? "scaleup" : ""} h-25 w-full object-cover`}
                                src={project[nextIndex]?.imageUrl}
                                alt=""
                            />
                            <img
                                className={`h-25 absolute top-0 left-0 -z-20 w-full object-cover`}
                                src={project[nextNextIndex]?.imageUrl}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div>

                </div>

                <div className="grid grid-cols-4  mt-6 gap-8">
                    {project.map((item, index) => (
                        <div
                            onClick={() => {
                                handleProjectClick(index);
                            }}
                            key={index}
                            className="grid gap-2 bg-gradient-to-r p-4 from-white/10 to-white/0 hover:to-white/10 cursor-pointer transition duration-200"
                        >
                            <p className="font-bold">{item.name}</p>
                            <p className="text-sm line-clamp-2 text-gray-300">{item.description}</p>
                            <div className="w-full mt-4 grid rounded-full h-[1px]">
                                <div
                                    className={`${activeIndex === index ? "loading" : ""
                                        } bg-white w-0 rounded-full`}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DesktopProjectAnimatedSection
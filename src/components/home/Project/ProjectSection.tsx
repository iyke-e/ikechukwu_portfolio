import { project } from '@/data/project'
import { div } from 'motion/react-client'
import Image from 'next/image'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { LuExternalLink } from 'react-icons/lu'

const ProjectSection = () => {

    const featuredProjects = project.filter(item => item.featured).slice(0, 4)

    return (
        <div className={"md:pad-auto grid gap-20 md:gap-0 mt-20"}>
            {
                featuredProjects.map((item, index) => (
                    <div key={index} className={`grid relative md:pb-30   md:grid-cols-2 gap-6 md:gap-30 `}>
                        <div className={`${index % 2 === 1 ? "md:order-2" : ""} `}>
                            <div style={{ backgroundImage: `url(${item.imageUrl})` }} className={` bg-cover bg-center aspect-video w-full bg-no-repeat md:rounded-lg grid place-content-end`}>
                                <ul className='flex md:hidden bg-background/60 backdrop-blur-[4px] rounded-tl-2xl px-4 py-2 items-center justify-end mt-10 gap-6 cursor-pointer'>
                                    <li>
                                        <a target='_blank' href={item.sourceUrl} className='flex items-center gap-4'>
                                            <FaGithub className='w-8 h-8' />
                                        </a>
                                    </li>
                                    <li>
                                        <a target='_blank' href={item.liveUrl} className='flex items-center gap-4'>
                                            <LuExternalLink className="w-8 h-8 hover:scale-110 transition" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={` md:pt-8 pad-auto md:px-0`}>
                            <h3 className="text-2xl mb-2">{item.name}</h3>
                            <p className="text-white/80">{item.description}</p>

                            <ul className='md:flex hidden items-center justify-end mt-10 gap-4 cursor-pointer'>
                                <li>
                                    <a target='_blank' href={item.sourceUrl} className='flex items-center gap-4'>
                                        <FaGithub className='w-8 h-8' />
                                    </a>
                                </li>
                                <li>
                                    <a target='_blank' href={item.liveUrl} className='flex items-center gap-4'>
                                        <LuExternalLink className="w-8 h-8 hover:scale-110 transition" />
                                    </a>
                                </li>
                            </ul>

                        </div>

                        <div className='absolute hidden md:block left-0 h-full md:left-1/2 top-0 md:-translate-x-1/2'>

                            <div className='w-6 aspect-square mx-auto mt-7 border-4 bg-background border-white/20 rounded-full '></div>
                            <div className='h-full w-[1px] mx-auto  bg-white/20'></div>
                        </div>
                    </div>
                ))
            }
            <div className='w-6 hidden md:block aspect-square mx-auto mt-7 border-4 bg-background border-[#3b3b3b] relative z-2 rounded-full '></div>

            <div>

            </div>
        </div>
    )
}

export default ProjectSection
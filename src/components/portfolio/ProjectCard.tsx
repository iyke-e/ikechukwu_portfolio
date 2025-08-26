"use client"

import React, { useState } from 'react'
import { LuExternalLink } from "react-icons/lu"
import { FaGithub } from "react-icons/fa"
import { ProjectProp } from '@/data/project'
import Image from 'next/image'

const ProjectCard = ({ item }: { item: ProjectProp }) => {
    const [overlay, setOverlay] = useState(false)

    return (
        <div className=" cursor-pointer transition duration-[0.7s] hover:scale-103">

            <div

                style={{ backgroundImage: `url(${item.imageUrl})` }}
                className="w-full h-60 bg-center grid place-content-end mb-1 bg-cover rounded-lg relative"
            >

                <div className="flex px-4 py-2 bg-black/60 backdrop-blur-[2px] rounded-tl-2xl rounded-br-lg items-end justify-end gap-4">
                    <a target="_blank" href={item.sourceUrl}>
                        <FaGithub className="w-6 h-6 hover:scale-110 transition" />
                    </a>
                    <a target="_blank" href={item.liveUrl}>
                        <LuExternalLink className="w-6 h-6 hover:scale-110 transition" />
                    </a>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="text-2xl font-bold mb-1 line-clamp-1">{item.name}</h3>

                <p className="line-clamp-2 mb-4 text-white/50">{item.description}</p>

                <div className="flex flex-wrap text-[12px] gap-2 mb-4">
                    {item.stack.map((tool, index) => (
                        <div
                            key={index}
                            className="flex gap-1 py-1 px-2 rounded-sm bg-white/5 items-center"
                        >
                            {tool.icon ? (
                                <Image src={tool.icon} alt={tool.name} className="w-3 h-3" />
                            ) : (
                                ""
                            )}
                            <p>{tool.name}</p>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default ProjectCard

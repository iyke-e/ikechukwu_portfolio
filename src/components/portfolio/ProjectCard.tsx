"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import { LuExternalLink } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { ProjectProp } from "@/data/project";
import Image from "next/image";

interface ProjectCardProps {
    item: ProjectProp;
    onClick: () => void; // triggered when card is clicked
}

const ProjectCard: React.FC<ProjectCardProps> = ({ item, onClick }) => {

    return (
        <div
            onClick={onClick}
            className="cursor-pointer border-2 relative border-white/20 backdrop-blur-sm h-fit bg-white/5 rounded-2xl transition duration-[0.7s] hover:scale-103"
        >

            <div
                style={{ backgroundImage: `url(${item.imageUrl})` }}
                className="w-full h-60 bg-center grid place-content-end mb-1 bg-cover rounded-t-lg relative"
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

            <div className=" p-4">
                <h3 className="text-2xl font-bold mb-1 line-clamp-1">{item.name}</h3>
                <p className="line-clamp-2 mb-4 text-white/50">{item.description}</p>

                <div className="flex flex-wrap text-[12px] gap-2">
                    {item.stack.map((tool, index) => (
                        <div
                            key={index}
                            className="flex gap-1 py-1 px-2 rounded-sm bg-white/5 items-center"
                        >
                            {tool.icon ? <Image src={tool.icon} alt={tool.name} className="w-3 h-3" /> : ""}
                            <p>{tool.name}</p>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default ProjectCard;

import React from "react";
import Image from "next/image";
import { ProjectProp } from "@/data/project";
import { IoClose } from "react-icons/io5";
import { projectExtended } from "@/data/projectExtended";
import { FaRegHeart } from "react-icons/fa";
import Button from "../ui/Button";
import { LuExternalLink } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";

interface ProjectDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectProp | null;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
    isOpen,
    onClose,
    project,
}) => {

    if (!isOpen || !project) return null;

    const activeProject = projectExtended.find(
        (item) => item.name === project.name
    );

    if (!activeProject) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 z-[99999999] backdrop-blur-sm bg-black/40 ">
            <div className="grid place-content-end">
                <button
                    onClick={onClose}
                    className="p-4 cursor-pointer ml-auto"
                >
                    <IoClose className="w-5 h-5 text-white" />
                </button>
            </div>

            <div onClick={(e) => { e.stopPropagation() }} className="relative w-full h-full bg-[#1f1f1f]/95 md:rounded-[3rem] shadow-xl overflow-y-auto py-6  md:p-10 flex flex-col gap-6">


                <div className="gap-6 flex  px-6 flex-row justify-between items-center" >
                    <h2 className="text-3xl text-white">{project.name}</h2>
                    <FaRegHeart className="w-6 h-6" />



                </div>

                {activeProject?.imageUrl && (
                    <div
                        style={{ backgroundImage: `url(${activeProject.imageUrl})` }}
                        className="w-full aspect-video bg-center md:rounded-2xl bg-cover  shadow-lg relative"
                    ></div>
                )}

                {/* Description */}
                <div className=" mx-auto pad-auto md:px-0 text-lg max-w-200 pb-10 md:py-20">

                    <div className="">
                        <div className="flex ml-auto w-fit gap-6 items-center">
                            <a target="_blank" href={activeProject.sourceUrl}>
                                <FaGithub className="w-8 h-8 hover:scale-110 transition" />
                            </a>
                            <a target="_blank" href={activeProject.liveUrl}>
                                <LuExternalLink className="w-8 h-8 hover:scale-110 transition" />
                            </a>
                        </div>

                        <h2 className="text-3xl md:text-5xl mb-4 md:mb-6 text-white">{project.name}</h2>


                    </div>
                    <p className="text-white/80 leading-relaxed">{project.description}</p>

                    {/* Tech Stack */}
                    {activeProject.stack.length > 0 && (
                        <div className="mt-10">
                            <h3 className="text-xl  text-white mb-2">
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {activeProject?.stack.map((tool, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 items-center py-1.5 px-3 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm transition"
                                    >
                                        {tool.icon && (
                                            <Image
                                                src={tool.icon}
                                                alt={tool.name}
                                                width={18}
                                                height={18}
                                            />
                                        )}
                                        <span>{tool.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {(activeProject?.features?.length) ? (
                        <div className="mt-10">
                            <h3 className="text-xl  text-white mb-2">
                                Key Features
                            </h3>
                            <ul className="list-disc list-inside text-white/70 space-y-1">
                                {activeProject.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {(activeProject?.problem) ? (
                        <div className="mt-10">
                            <h3 className="text-xl  text-white mb-2">
                                The Problem
                            </h3>
                            <p className="text-lg leading-10">{activeProject.problem}</p>
                        </div>
                    ) : null}
                    {(activeProject?.solution) ? (
                        <div className="mt-10">
                            <h3 className="text-xl  text-white mb-2">
                                Our Solution
                            </h3>
                            <p className="text-lg leading-10">{activeProject.solution}</p>
                        </div>
                    ) : null}
                    {(activeProject?.impact) ? (
                        <div className="mt-10">
                            <h3 className="text-xl  text-white mb-2">
                                Impact
                            </h3>
                            <p className="text-lg leading-10">{activeProject.impact}</p>
                        </div>
                    ) : null}

                    {(activeProject?.futureImprovements?.length) ? (
                        <div className="mt-10">
                            <h3 className="text-lg  text-white mb-2">
                                Futher Improvements
                            </h3>
                            <ul className="list-disc list-inside text-white/70 space-y-2">
                                {activeProject.futureImprovements.map((improvement, idx) => (
                                    <li key={idx}>{improvement}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                    {(activeProject?.challenges?.length) ? (
                        <div className="mt-10">
                            <h3 className="text-lg  text-white mb-2">
                                Challenges Encountered
                            </h3>
                            <ul className="list-disc list-inside text-white/70 space-y-2">
                                {activeProject.challenges.map((improvement, idx) => (
                                    <li key={idx}>{improvement}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                    {(activeProject?.lessonsLearned?.length) ? (
                        <div className="mt-10">
                            <h3 className="text-lg  text-white mb-2">
                                Lessons Learned
                            </h3>
                            <ul className="list-disc list-inside text-white/70 space-y-2">
                                {activeProject?.lessonsLearned?.map((lesson, idx) => (
                                    <li key={idx}>{lesson}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {/* Links */}
                    <div className="flex gap-4 mt-10">
                        {activeProject?.liveUrl && (
                            <a
                                href={activeProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"

                            ><Button>View Live site</Button>





                            </a>
                        )}
                        {activeProject?.sourceUrl && (
                            <a
                                href={activeProject.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"

                            >
                                <Button variant='white'>View Source</Button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProjectDetailModal;

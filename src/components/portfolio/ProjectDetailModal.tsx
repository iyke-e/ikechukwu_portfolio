import React from "react";
import Image from "next/image";
import { ProjectProp } from "@/data/project";
import { IoClose } from "react-icons/io5";
import { projectExtended } from "@/data/projectExtended";
import { FaUserCircle, FaRegClock, FaUsers, FaInfoCircle } from "react-icons/fa";
import Button from "../ui/Button";
import { LuExternalLink } from "react-icons/lu";

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

  const foundProject = projectExtended.find(
    (item) => item.name === project.name
  );

  // Fallback to base project details if extended case study data is missing
  const activeProject = foundProject || {
    name: project.name,
    description: project.description,
    imageUrl: typeof project.imageUrl === "string" ? project.imageUrl : project.imageUrl.src,
    stack: project.stack,
    liveUrl: project.liveUrl,
    sourceUrl: project.sourceUrl,
    projectType: project.projectType || ["Project"],
    tags: project.tags || [],
    role: "Lead Developer",
    duration: "4 Weeks",
    status: "Completed",
    teamSize: "1 (Solo)",
    problem: "",
    solution: "",
    features: [],
    challenges: [],
    lessonsLearned: [],
    category: project.category || "web",
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99999999] backdrop-blur-md bg-black/60 flex items-center justify-center p-4 md:p-10 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1200px] h-[90dvh] bg-[#0d0d0d] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Sticky Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 md:px-10 md:py-6 border-b border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md z-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">
              {activeProject.projectType.join(" / ")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
              {project.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:rotate-90 cursor-pointer"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-12 scrollbar-thin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* Left Sticky Panel */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-0 h-fit">
              {activeProject?.imageUrl && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg relative group">
                  <div
                    style={{ backgroundImage: `url(${activeProject.imageUrl})` }}
                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                  ></div>
                </div>
              )}

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-accent text-sm mb-1">
                    <FaUserCircle className="w-4 h-4" />
                    <span>Role</span>
                  </div>
                  <p className="font-semibold text-white text-sm md:text-base">
                    {activeProject.role || "Developer"}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-accent text-sm mb-1">
                    <FaRegClock className="w-4 h-4" />
                    <span>Duration</span>
                  </div>
                  <p className="font-semibold text-white text-sm md:text-base">
                    {activeProject.duration || "4 Weeks"}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-accent text-sm mb-1">
                    <FaInfoCircle className="w-4 h-4" />
                    <span>Status</span>
                  </div>
                  <p className="font-semibold text-white text-sm md:text-base">
                    {activeProject.status || "Completed"}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-accent text-sm mb-1">
                    <FaUsers className="w-4 h-4" />
                    <span>Team Size</span>
                  </div>
                  <p className="font-semibold text-white text-sm md:text-base">
                    {activeProject.teamSize || "1 (Solo)"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-2">
                {activeProject?.liveUrl && (
                  <a
                    href={activeProject.category === "mobile" ? "#contact" : activeProject.liveUrl}
                    target={activeProject.category === "mobile" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    onClick={activeProject.category === "mobile" ? onClose : undefined}
                    className="w-full block"
                  >
                    <Button className="w-full justify-center gap-2 py-3.5 font-semibold text-base">
                      {activeProject.category === "mobile"
                        ? "Request App Access"
                        : "Launch Live App"}{" "}
                      {activeProject.category !== "mobile" && <LuExternalLink className="w-4 h-4" />}
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Right Scrollable Content */}
            <div className="lg:col-span-7 flex flex-col gap-8 md:gap-10">
              
              {/* Overview / Story */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Project Story</h3>
                <p className="text-white/80 text-base md:text-lg leading-8 md:leading-9">
                  {project.description}
                </p>
              </div>

              {/* Problem & Solution Cards */}
              <div className="grid gap-6">
                {activeProject.problem && (
                  <div className="p-6 rounded-2xl border border-red-500/10 bg-red-500/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/50"></div>
                    <h4 className="text-red-400 font-bold text-lg mb-2">The Challenge</h4>
                    <p className="text-white/80 leading-7 text-sm md:text-base">
                      {activeProject.problem}
                    </p>
                  </div>
                )}

                {activeProject.solution && (
                  <div className="p-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/50"></div>
                    <h4 className="text-emerald-400 font-bold text-lg mb-2">The Solution</h4>
                    <p className="text-white/80 leading-7 text-sm md:text-base">
                      {activeProject.solution}
                    </p>
                  </div>
                )}
              </div>

              {/* Tech Stack Badge List */}
              {activeProject.stack.length > 0 && (
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Tech Stack & Tools</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {activeProject.stack.map((tool, idx) => (
                      <div
                        key={idx}
                        className="flex gap-2 items-center py-2 px-4 rounded-xl border border-white/10 bg-white/5 text-white/90 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        {tool.icon && (
                          <Image src={tool.icon} alt={tool.name} width={16} height={16} />
                        )}
                        <span>{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features Grid */}
              {activeProject.features && activeProject.features.length > 0 && (
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Core Deliverables</h3>
                  <div className="grid gap-3.5">
                    {activeProject.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition-colors"
                      >
                        <span className="text-emerald-400 mt-0.5 select-none font-bold">✓</span>
                        <p className="text-white/80 text-sm md:text-base leading-7">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges & Lessons */}
              {(activeProject.challenges?.length || activeProject.lessonsLearned?.length) && (
                <div className="grid gap-6">
                  {activeProject.challenges && activeProject.challenges.length > 0 && (
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/5">
                      <h4 className="text-white font-bold text-lg mb-3">Key Technical Challenges</h4>
                      <ul className="list-disc pl-5 text-white/70 space-y-2.5 text-sm md:text-base leading-7">
                        {activeProject.challenges.map((challenge, idx) => (
                          <li key={idx}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeProject.lessonsLearned && activeProject.lessonsLearned.length > 0 && (
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/5">
                      <h4 className="text-white font-bold text-lg mb-3">Engineering Lessons</h4>
                      <ul className="list-disc pl-5 text-white/70 space-y-2.5 text-sm md:text-base leading-7">
                        {activeProject.lessonsLearned.map((lesson, idx) => (
                          <li key={idx}>{lesson}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;

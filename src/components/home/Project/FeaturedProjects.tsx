import Button from "@/components/ui/Button";
import { project, StackProp } from "@/data/project";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { LuExternalLink } from "react-icons/lu";

interface ProjectCardProps {
  imagebg: string | StaticImageData;
  title: string;
  description: string;
  stack: StackProp[];
  liveUrl: string;
}

export const ProjectCard = ({
  imagebg,
  title,
  description,
  stack,
  liveUrl,
}: ProjectCardProps) => {
  return (
    <div className="grid md:grid-cols-2 py-14 pad-auto">
      <div
        style={{ backgroundImage: `url(${imagebg})` }}
        className="bg-no-repeat bg-center bg-cover h-70 md:h-110 w-full"
      ></div>

      <div className=" py-4 md:pl-8">
        <h1 className="text-4xl mb-6">{title}</h1>
        <p className="text-gray-300 leading-7 mb-8 ">{description}</p>
        <p className="text-gray-300 leading-7 mb-4 ">Built with: </p>

        <div className="flex items-center flex-wrap gap-3 mb-10">
          {stack.map((item, index) => (
            <div
              className="flex bg-foreground/10 border border-foreground/15 px-4 py-2 rounded-full items-center gap-1"
              key={index}
            >
              <Image src={item.icon} width={14} height={14} alt="" />
              <p className="text-sm">{item.name}</p>
            </div>
          ))}
        </div>
        <a
          target="_blank"
          href={liveUrl}
          className="flex items-center ml-auto mt-8  gap-4"
        >
          <Button className="flex w-full font-medium justify-center  gap-2 items-end">
            See it in Action <LuExternalLink className="w-5 h-5" />
          </Button>
        </a>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  const featured = project.filter((item) => item.featured === true);

  return (
    <div>
      {featured.map((item, index) => (
        <div
          key={index}
          className={
            index === project.length - 1 ? "" : "border-b border-foreground/20"
          }
        >
          <ProjectCard
            liveUrl={item.liveUrl}
            stack={item.stack}
            title={item.name}
            description={item.description}
            imagebg={item.imageUrl}
          />
        </div>
      ))}
    </div>
  );
};

export default FeaturedProjects;

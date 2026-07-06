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
  onReadMore?: () => void;
  category?: string;
}

export const ProjectCard = ({
  imagebg,
  title,
  description,
  stack,
  liveUrl,
  onReadMore,
  category,
}: ProjectCardProps) => {
  const isMobileApp = category === "mobile";
  const hasLiveUrl = liveUrl && !liveUrl.includes("github.com");

  let finalLiveUrl = liveUrl;
  let buttonLabel = "See it in Action";
  let buttonIcon: React.ReactNode = <LuExternalLink className="w-5 h-5" />;
  let targetAttr: string | undefined = "_blank";

  if (isMobileApp) {
    if (hasLiveUrl) {
      finalLiveUrl = liveUrl;
      buttonLabel = liveUrl.includes("play.google.com") ? "View on Play Store" : "Launch Live App";
      buttonIcon = <LuExternalLink className="w-5 h-5" />;
      targetAttr = "_blank";
    } else {
      finalLiveUrl = "#contact";
      buttonLabel = "Request App Access";
      buttonIcon = null;
      targetAttr = undefined;
    }
  }

  return (
    <div className="grid md:grid-cols-2 py-14 pad-auto items-center">
      <div className="relative h-70 md:h-110 w-full overflow-hidden rounded-2xl border border-white/5 bg-black/20">
        {/* Blurred background cover */}
        <div
          style={{ backgroundImage: `url(${typeof imagebg === 'string' ? imagebg : imagebg.src})` }}
          className="absolute inset-0 bg-no-repeat bg-center bg-cover blur-md scale-110 opacity-80"
        ></div>
        {/* Contained foreground image */}
        <div
          style={{ backgroundImage: `url(${typeof imagebg === 'string' ? imagebg : imagebg.src})` }}
          className="absolute inset-0 bg-no-repeat bg-center bg-contain"
        ></div>
      </div>

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
        
        <div className="flex flex-wrap gap-4 mt-8 items-center">
          {finalLiveUrl && (
            <a
              target={targetAttr}
              href={finalLiveUrl}
              className="flex-1 min-w-[160px]"
              onClick={() => {
                if (isMobileApp && !hasLiveUrl) {
                  window.dispatchEvent(
                    new CustomEvent("request-app-access", { detail: { appName: title } })
                  );
                }
              }}
            >
              <Button className="flex w-full font-medium justify-center gap-2 items-center">
                {buttonLabel} {buttonIcon}
              </Button>
            </a>
          )}
          {onReadMore && (
            <div className="flex-1 min-w-[160px] cursor-pointer">
              <Button onClick={onReadMore} variant="white" className="w-full font-medium justify-center">
                Read Case Study
              </Button>
            </div>
          )}
        </div>
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
            category={item.category}
          />
        </div>
      ))}
    </div>
  );
};

export default FeaturedProjects;

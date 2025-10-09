import { experiences } from "@/data/experiences";
import React from "react";

const FullExperience = () => {
  return (
    <div className="pt-10 max-w-[900px] mx-auto px-4">
      <h2 className="text-4xl font-semibold text-center mb-10">
        My Experience
      </h2>

      <div className="relative border-l border-white/20 ml-4 md:ml-8">
        {experiences.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className={`
                relative mb-10 md:grid md:grid-cols-12 items-center
              `}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-2 md:left-[calc(50%-6px)] top-0 w-3 h-3 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 shadow-lg"></div>

              {/* Card */}
              <div
                className={`
                  col-span-12 md:col-span-6 ${
                    isLeft ? "md:pr-8 md:col-start-1" : "md:pl-8 md:col-start-7"
                  } bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform duration-500 hover:-translate-y-1
                `}
              >
                <h3 className="font-bold text-lg md:text-xl mb-2">
                  {item.role} at {item.company}{" "}
                  <span className="text-foreground/50">({item.type})</span>
                </h3>
                <p className="text-white/70 mb-3">{item.description}</p>
                <p className="font-bold text-sm md:text-lg text-foreground/80 text-right">
                  {item.year}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FullExperience;

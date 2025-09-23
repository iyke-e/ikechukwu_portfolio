import { experiences } from "@/data/experiences";
import React from "react";
import Bg2 from "@/assets/bg3.jpg";

const Experience = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,1), rgba(10,10,10,0.5),  rgba(10,10,10,0.5), rgba(10,10,10,1)), url(${Bg2.src})`,
      }}
      className="py-10 "
    >
      <div className="pad-auto mb-16">
        <p className=" md:mb-6 text-center text-blue-400 ">Experience</p>
        <h1 className="text-[32px] md:text-5xl text-center">
          Executive Summary{" "}
        </h1>
      </div>
      <div className="grid gap-10 md:gap-14 md:mx-20 pad-auto">
        {experiences.map((item, index) => (
          <div
            key={index}
            className={`pad-auto   py-6 bg-white/10 backdrop-blur-sm md:border ${
              index % 2 === 1 ? "ml-auto" : ""
            } md:border-white/20 max-w-[800px] rounded-2xl md:shadow md:py-10`}
          >
            <div className="mb-6 lg:mb-0">
              <h3 className="font-bold mb-4 text-lg md:text-xl">
                {item.role} at {item.company} ({item.type})
              </h3>
              <p className="text-white/70">{item.description}</p>
            </div>

            <div>
              <p className="text-right md:text-2xl font-bold">{item.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;

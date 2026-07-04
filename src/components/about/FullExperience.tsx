"use client";

import { experiences } from "@/data/experiences";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FullExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".timeline-card");
      const dots = gsap.utils.toArray(".timeline-dot");

      cards.forEach((card: any, idx: number) => {
        const isLeft = idx % 2 === 0;

        // Slide card in from left/right
        gsap.fromTo(
          card,
          {
            x: isLeft ? -80 : 80,
            opacity: 0,
            scale: 0.95,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Pop dot animation in sync
        gsap.fromTo(
          dots[idx] as any,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="pt-10 max-w-[900px] mx-auto px-4">
      <h2 className="text-4xl font-semibold text-center mb-10">
        My Experience
      </h2>

      <div className="relative ml-4 md:ml-8">
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
              <div className="timeline-dot absolute -left-2.5 md:left-[calc(50%-8px)] top-1 w-4 h-4 rounded-full bg-white border border-accent shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>

              {/* Card */}
              <div
                className={`
                  timeline-card col-span-12 md:col-span-6 ${
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

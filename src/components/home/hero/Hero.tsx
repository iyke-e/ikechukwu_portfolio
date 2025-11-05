"use client";

import React from "react";
import Button from "../../ui/Button";
import GlidingStack from "./GlidingStack";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
    });

    const split = SplitText.create("#text", {
      type: "lines",
    });

    gsap.from(split.lines, {
      y: 100,
      autoAlpha: 0,
      stagger: 0.05,
    });
  }, []);

  return (
    <div className="relative pt-20 md:pt-30 ">
      <div className="pad-auto relative justify-between gap-10 flex items-center">
        <div className=" mb-10 md:mb-0">
          <p id="dummytext" className="opacity-10 mb-4   ">
            React + React Native + Next.js + Redux + Node
          </p>
          <div>
            <h1 className="text-4xl md:text-6xl  font-semibold max-w-220 leading-12 mb-4 md:leading-18 ">
              Turning Code into <br /> Seamless Experiences
            </h1>
            <p id="text" className="text-white/70  max-w-160 ">
              I'm Ikechukwu Egwim, a Full Stack Developer with a passion for the
              pixels. Specializing in Frontend development, I build beautiful,
              high-performance interfaces and the solid infrastructure to power
              them.
            </p>
          </div>
          <div className="flex item-center  mt-8 gap-4">
            <Link href="/portfolio">
              <Button>View Portfolio</Button>
            </Link>
            <Link href="/contact">
              <Button variant="white">Get in Touch</Button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:grid gap-2 w-100 h-100 opacity-10 grid-cols-2">
          <div className="  border-4 border-white aspect-square h-full w-full rounded-b-full " />
          <div className="bg-white aspect-square h-full w-full rounded-full " />
          <div className="border-4 border-white aspect-square h-full w-full rounded-full " />{" "}
          <div className="  border-4 border-white aspect-square h-full w-full rounded-t-full " />
        </div>
      </div>

      <div className=" mt-4 md:mt-10">
        <GlidingStack />
      </div>
    </div>
  );
};

export default Hero;

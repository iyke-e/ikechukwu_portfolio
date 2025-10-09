import React from "react";
import Aipics from "@/assets/nobg.png";
import TechStack from "./TechStack";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Link from "next/link";

const AboutMe = () => {
  return (
    <div className="py-10 mt-10 mb-20">
      <SectionHeader title="About Me" subtitle="Meet the dev" />
      <p className="leading-8 text-center max-w-250 mx-auto text-lg  ">
        I’m Ikechukwu Egwim, a full-stack developer working across web, mobile,
        and backend platforms. I focus on building fast, reliable, and scalable
        products that solve real problems. My work blends solid engineering with
        thoughtful design. I care about how things look, how they feel to use,
        and how well they perform under real conditions. Each project is an
        opportunity to turn ideas into functional, maintainable systems that
        deliver value.
      </p>

      <div className="grid mt-6 place-content-center">
        <Link href="/about">
          <Button variant="white">More About Me</Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutMe;

"use client";

import React, { useState } from "react";

import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";
import FullExperience from "@/components/about/FullExperience";
import TechStack from "@/components/home/About/TechStack";
import Education from "@/components/about/Education";
import MyStory from "@/components/about/MyStory";
import PagesHero from "@/components/ui/PagesHero";
import Connect from "@/components/home/Connect";

const About = () => {
  return (
    <div className="py-4">
      <PagesHero title="About Me." />

      <MyStory />
      <Connect />
    </div>
  );
};

export default About;

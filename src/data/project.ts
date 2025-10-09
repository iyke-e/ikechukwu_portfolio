import Next from "@/assets/next.svg";
import Github from "@/assets/github.svg";
import Git from "@/assets/git.svg";
import Expo from "@/assets/expo.svg";
import Vite from "@/assets/vite.svg";
import Figma from "@/assets/figma.svg";
import HTML from "@/assets/html.svg";
import Redux from "@/assets/redux.svg";
import Android from "@/assets/android.svg";
import IOS from "@/assets/ios.svg";
import CSS from "@/assets/css.svg";
import Node from "@/assets/node.svg";
import Firebase from "@/assets/firebase.svg";
import Supabase from "@/assets/supabase.png";
import Zustand from "@/assets/zustand.svg";
import Js from "@/assets/javascript.svg";
import Ts from "@/assets/typescript.svg";
import Vscode from "@/assets/vscode.svg";
import Vercel from "@/assets/vercel.svg";
import Fintrack from "@/assets/projectsimg/fintrack.png";

import Tailwind from "@/assets/tailwindcss.svg";
import ReactIcon from "@/assets/react.svg";
import type { StaticImageData } from "next/image";

export type StackProp = {
  name: string;
  icon: StaticImageData | string;
};

export interface ProjectProp {
  featured: boolean;
  category: string;
  name: string;
  description: string;
  stack: StackProp[];
  liveUrl: string;
  sourceUrl: string;
  imageUrl: string | StaticImageData;
  tags: string[];
  projectType: string[];
}

export const project: ProjectProp[] = [
  {
    featured: true,
    category: "mobile",
    name: "Fintrack",
    description:
      "FinTrack is a personal finance management application that allows users to track income and expenses, set and monitor budgets, and visualize financial trends over time. The app provides real-time data insights, intuitive dashboards, and secure data storage, helping users understand and manage their financial habits effectively.",
    stack: [
      { name: "Expo", icon: Expo },
      { name: "TypeScript", icon: Ts },
      { name: "Supabase", icon: Supabase },
      { name: "Zustand", icon: Zustand },
    ],
    liveUrl: "https://github.com/iyke-e/fintrackapp",
    sourceUrl: "https://github.com/iyke-e/fintrackapp",
    imageUrl: Fintrack.src,
    tags: ["Fullstack", "Dashboards", "Collaboration"],
    projectType: ["CMS", "Fullstack", "Dashboard"],
  },
  {
    featured: true,
    category: "web",
    name: "ShowcaseHub",
    description:
      "ShowcaseHub provides a simple CMS for building and managing portfolio projects, making it easy for clients and creators to keep their work up-to-date and beautifully presented.",
    stack: [
      { name: "Next.js", icon: Next },
      { name: "TypeScript", icon: Ts },
      { name: "Tailwind", icon: Tailwind },
      { name: "Supabase", icon: Supabase },
      { name: "Node.js", icon: Node },
    ],
    liveUrl: "https://showcaseh.vercel.app/",
    sourceUrl: "https://github.com/iyke-e/showcasehub",
    imageUrl:
      "https://ucarecdn.com/28bb37f2-115e-476b-9ec4-7198fa2e3248/-/preview/1000x762/",
    tags: ["Fullstack", "Dashboards", "Collaboration"],
    projectType: ["CMS", "Fullstack", "Dashboard"],
  },
  {
    featured: true,
    category: "web",
    name: "CampusCrib",
    description:
      "CampusCrib is an online platform for students to find available hostels around their school area.",
    stack: [
      { name: "React", icon: ReactIcon },
      { name: "TypeScript", icon: Ts },
      { name: "Tailwind", icon: Tailwind },
      { name: "Firebase", icon: Firebase },
      { name: "Node.js", icon: Node },
    ],
    liveUrl: "https://github.com/iyke-e/CampusCrib",
    sourceUrl: "https://github.com/iyke-e/CampusCrib",
    imageUrl:
      "https://max.ucarecdn.com/e6723286-8b0e-4351-a710-23ff6b9cfb7d/-/preview/1000x527/",
    tags: ["Fullstack", "Web Apps", "Dashboards", "AI/ML"],
    projectType: ["Web Apps", "Fullstack", "Dashboard"],
  },
  {
    featured: false,
    category: "web",
    name: "Developer Portfolio",
    description:
      "Portfolio website built with React and custom REST API, featuring responsive design, database integration, and seamless interactions.",
    stack: [
      { name: "React", icon: ReactIcon },
      { name: "Tailwind", icon: Tailwind },
      { name: "Vite", icon: Vite },
      { name: "TypeScript", icon: Ts },
      { name: "Vercel", icon: Vercel },
    ],
    liveUrl: "https://personal-portfolio-v-2-0.pages.dev/",
    sourceUrl: "https://github.com/iyke-e/personal-portfolio-v.2.0",
    imageUrl:
      "https://ucarecdn.com/fe937da7-2b4b-464a-be23-aef8ae6ca059/personalportfoliov20.png",
    tags: ["React", "Frontend", "REST API"],
    projectType: ["Portfolio/Branding"],
  },
];

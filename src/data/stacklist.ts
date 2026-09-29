import Tailwind from "@/assets/tailwindcss.svg";
import ReactIcon from "@/assets/react.svg";
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
import Express from "@/assets/express.svg";
import MongoDB from "@/assets/mongodb.svg";
import Postgres from "@/assets/postgresql.svg";
import Prisma from "@/assets/prisma.svg";
import Docker from "@/assets/docker.svg";
import AWS from "@/assets/aws.svg";
import Python from "@/assets/python.svg";
import FastAPI from "@/assets/fastapi.svg";
import Tensorflow from "@/assets/tensorflow.svg";
import Langchain from "@/assets/langchain.svg";
import OpenAI from "@/assets/openai.svg";
import Flutter from "@/assets/flutter.svg";
import ExpoGo from "@/assets/expo.svg";

export interface StackItem {
  name: string;
  icon: any;
  category:
    | "frontend"
    | "backend"
    | "mobile"
    | "database"
    | "devops"
    | "design"
    | "tools"
    | "ai";
  level?: "flagship" | "proficient" | "expanding";
}

export const stackList: StackItem[] = [
  // ===== MOBILE (CORE FLAGSHIP) =====
  { name: "React Native", icon: ReactIcon, category: "mobile", level: "flagship" },
  { name: "Flutter", icon: Flutter, category: "mobile", level: "flagship" },
  { name: "Expo", icon: ExpoGo, category: "mobile", level: "flagship" },
  { name: "iOS", icon: IOS, category: "mobile", level: "flagship" },
  { name: "Android", icon: Android, category: "mobile", level: "flagship" },

  // ===== FRONTEND (CORE FLAGSHIP) =====
  { name: "Next.js", icon: Next, category: "frontend", level: "flagship" },
  { name: "React.js", icon: ReactIcon, category: "frontend", level: "flagship" },
  { name: "TypeScript", icon: Ts, category: "frontend", level: "flagship" },
  { name: "JavaScript", icon: Js, category: "frontend", level: "flagship" },
  { name: "Tailwind CSS", icon: Tailwind, category: "frontend", level: "flagship" },
  { name: "Zustand", icon: Zustand, category: "frontend", level: "flagship" },
  { name: "Redux", icon: Redux, category: "frontend", level: "proficient" },
  { name: "Vite", icon: Vite, category: "frontend", level: "flagship" },
  { name: "HTML5", icon: HTML, category: "frontend", level: "flagship" },
  { name: "CSS3", icon: CSS, category: "frontend", level: "flagship" },

  // ===== BACKEND (EXPANDING FOCUS & SUPPORT) =====
  { name: "Node.js", icon: Node, category: "backend", level: "proficient" },
  { name: "Express.js", icon: Express, category: "backend", level: "proficient" },
  { name: "PostgreSQL", icon: Postgres, category: "backend", level: "proficient" },
  { name: "MongoDB", icon: MongoDB, category: "backend", level: "proficient" },
  { name: "Prisma ORM", icon: Prisma, category: "backend", level: "proficient" },
  { name: "Supabase", icon: Supabase, category: "backend", level: "proficient" },
  { name: "Firebase", icon: Firebase, category: "backend", level: "proficient" },
  { name: "Docker", icon: Docker, category: "backend", level: "expanding" },

  // ===== TOOLS & DESIGN =====
  { name: "Git", icon: Git, category: "tools", level: "proficient" },
  { name: "GitHub", icon: Github, category: "tools", level: "proficient" },
  { name: "VS Code", icon: Vscode, category: "tools", level: "proficient" },
  { name: "Figma", icon: Figma, category: "tools", level: "proficient" },
  { name: "Vercel", icon: Vercel, category: "tools", level: "proficient" },
];

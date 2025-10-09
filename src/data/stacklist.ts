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
}

export const stackList: StackItem[] = [
  // ===== FRONTEND =====
  { name: "Next.js", icon: Next, category: "frontend" },
  { name: "React.js", icon: ReactIcon, category: "frontend" },
  { name: "Tailwind CSS", icon: Tailwind, category: "frontend" },
  { name: "HTML5", icon: HTML, category: "frontend" },
  { name: "CSS3", icon: CSS, category: "frontend" },
  { name: "JavaScript", icon: Js, category: "frontend" },
  { name: "TypeScript", icon: Ts, category: "frontend" },
  { name: "Redux", icon: Redux, category: "frontend" },
  { name: "Zustand", icon: Zustand, category: "frontend" },
  { name: "Vite", icon: Vite, category: "frontend" },

  // ===== BACKEND =====
  { name: "Node.js", icon: Node, category: "backend" },
  { name: "Express.js", icon: Express, category: "backend" },
  // { name: "FastAPI", icon: FastAPI, category: "backend" },
  // { name: "Python", icon: Python, category: "backend" },
  { name: "Firebase", icon: Firebase, category: "backend" },
  { name: "Supabase", icon: Supabase, category: "backend" },
  // { name: "Prisma ORM", icon: Prisma, category: "backend" },

  // ===== DATABASE =====
  { name: "MongoDB", icon: MongoDB, category: "backend" },
  { name: "PostgreSQL", icon: Postgres, category: "backend" },

  // ===== MOBILE =====
  { name: "Expo", icon: ExpoGo, category: "mobile" },
  { name: "React Native", icon: ReactIcon, category: "mobile" },
  // { name: "Flutter", icon: Flutter, category: "mobile" },
  { name: "Android", icon: Android, category: "mobile" },
  { name: "iOS", icon: IOS, category: "mobile" },

  // ===== DEVOPS =====
  { name: "Docker", icon: Docker, category: "backend" },
  // { name: "AWS", icon: AWS, category: "devops" },
  { name: "Vercel", icon: Vercel, category: "tools" },

  // // ===== AI / ML =====
  // { name: "TensorFlow", icon: Tensorflow, category: "ai" },
  // { name: "LangChain", icon: Langchain, category: "ai" },
  // { name: "OpenAI API", icon: OpenAI, category: "ai" },

  // ===== DESIGN =====
  { name: "Figma", icon: Figma, category: "tools" },

  // ===== TOOLS =====
  { name: "Git", icon: Git, category: "tools" },
  { name: "GitHub", icon: Github, category: "tools" },
  { name: "VS Code", icon: Vscode, category: "tools" },
];

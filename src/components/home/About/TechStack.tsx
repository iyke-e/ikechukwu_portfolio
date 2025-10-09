"use client";
import { useState } from "react";
import { stackList } from "@/data/stacklist";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

const TechStack = () => {
  const categories = Array.from(
    new Set(stackList.map((item) => item.category))
  );

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredStack = stackList.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="mt-14 mb-20">
      <SectionHeader title="My Tech Stack" subtitle="Tools i work with daily" />

      {/* Category Selector */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        <div className="flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative cursor-pointer px-5 py-2.5 text-sm capitalize rounded-full transition-all duration-500 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-gray-400 via-gray-800 to-gray-600 text-white shadow-lg"
                  : "text-foreground/70 hover:text-white"
              }`}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Stack Grid */}
      <ul className="flex flex-wrap items-center justify-center gap-2 mt-12 mx-auto max-w-[1200px] px-4">
        {filteredStack.map((item) => (
          <li
            key={item.name}
            className="group flex items-center  p-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <div className="p-2 rounded-xl bg-white/10 group-hover:bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 transition-all duration-500">
              <Image
                src={item.icon}
                width={20}
                height={20}
                alt={`${item.name} icon`}
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-sm font-medium px-2 text-foreground/80 group-hover:text-white transition-colors duration-300">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechStack;

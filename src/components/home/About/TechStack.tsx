"use client";

import { useState } from "react";
import { stackList } from "@/data/stacklist";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const TechStack = () => {
  const categories = Array.from(
    new Set(stackList.map((item) => item.category))
  );

  const [activeCategory, setActiveCategory] = useState("mobile");

  const filteredStack = stackList.filter(
    (item) => item.category === activeCategory
  );

  const categoryLabel = (cat: string) => {
    switch (cat) {
      case "mobile": return "Mobile";
      case "frontend": return "Frontend";
      case "backend": return "Backend";
      case "database": return "Database";
      case "devops": return "DevOps";
      case "design": return "Design";
      case "tools": return "Tools";
      case "ai": return "AI / ML";
      default: return cat;
    }
  };

  return (
    <div className="mt-14 mb-20">
      <SectionHeader title="My Tech Stack" subtitle="Tools i work with daily" />

      {/* Category Selector (fits project filter nav schema) */}
      <div className="overflow-x-auto scrollbar-hide flex justify-center my-8 pad-auto">
        <ul className="flex grow-0 shrink-0 gap-3 md:gap-6">
          {categories.map((category) => (
            <li key={category} onClick={() => setActiveCategory(category)}>
              <Button
                className={`${
                  category === activeCategory
                    ? "gradientAnimateWhite !text-background"
                    : ""
                } whitespace-nowrap !text-xs`}
              >
                {categoryLabel(category)}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Stack Grid */}
      <ul className="flex flex-wrap items-center justify-center gap-2 mt-12 mx-auto max-w-[1200px] px-4">
        {filteredStack.map((item) => (
          <li
            key={item.name}
            className="group flex items-center p-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <div className="p-2 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all duration-500">
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

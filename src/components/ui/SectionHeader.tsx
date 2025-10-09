"use client";
import React, { useEffect, useState } from "react";

const colors = [
  "text-green-500",
  "text-blue-500",
  "text-red-500",
  "text-purple-500",
  "text-yellow-500",
  "text-pink-500",
];

interface SectionHeaderProps {
  subtitle: string;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ subtitle, title }) => {
  const [randomColor, setRandomColor] = useState<string>("");

  useEffect(() => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setRandomColor(color);
  }, []);

  return (
    <div className="pad-auto">
      <div className="pad-auto mb-10">
        <p className={`mb-2 text-center ${randomColor}`}>{subtitle}</p>
        <h1 className="text-[32px] md:text-5xl text-center">{title}</h1>
      </div>
    </div>
  );
};

export default SectionHeader;

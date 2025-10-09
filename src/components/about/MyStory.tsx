"use client";

import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const MyStory = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => setShowMore(!showMore);

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-16 py-20 px-6 md:px-20">
      {/* Text Section */}
      <div className="flex flex-col justify-center md:w-3/4">
        <p className="text-lg leading-8">
          I’m Ikechukwu Egwim, a frontend and full-stack developer passionate
          about building web and mobile applications that are fast, intuitive,
          and scalable. I specialize in{" "}
          <strong>React, Next.js, and Node.js</strong>, creating interfaces that
          look clean and perform seamlessly.
        </p>

        {/* Key Skills / Highlights */}
        <ul className="list-disc ml-5 mt-4 text-lg leading-8 flex flex-col gap-2">
          <li>Responsive web apps with real-time dashboards</li>
          <li>Mobile apps with smooth UI and backend integration</li>
          <li>Full-stack development covering frontend and API workflows</li>
        </ul>

        {/* Optional Extended Story */}
        {showMore && (
          <div className="mt-4 text-lg leading-8">
            <p>
              My journey into tech began in 2019 with self-taught Python and
              HTML/CSS. Since then, I’ve completed internships, a Computer
              Science degree, and a mobile development program at Rise. Each
              project challenges me to grow and write better code.
            </p>
            <p className="mt-4">
              Outside of coding, I enjoy gaming, exploring new places, and
              discovering tech gadgets that make life easier.
            </p>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          className="mt-4 text-blue-400 font-medium hover:underline w-fit"
        >
          {showMore ? "Show Less" : "Read More"}
        </button>

        {/* Social Links */}
        <div className="flex items-center mt-6 gap-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/iyke-e"
            aria-label="GitHub Profile"
            className="text-gray-300 hover:text-white transition"
          >
            <FaGithub className="w-8 h-8" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://linkedin.com/in/iyke-gp"
            aria-label="LinkedIn Profile"
            className="text-gray-300 hover:text-white transition"
          >
            <FaLinkedin className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyStory;

"use client";

import Button from "@/components/ui/Button";
import React from "react";
import { FiSend } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import SectionHeader from "@/components/ui/SectionHeader";

const ContactSection = () => {
  return (
    <div id="contact" className="py-16 border-t border-white/10">
      <SectionHeader title="Contact" subtitle="Let's get in touch" />

      <div className="grid pad-auto py-10 gap-6 md:grid-cols-2 md:items-center max-w-[1200px] mx-auto">
        <div>
          <h1 className="text-3xl mb-4 md:text-5xl max-w-200 md:leading-18">
            Start a Conversation
          </h1>
          <p className="text-white/70 text-lg leading-8">
            Have a project in mind, want to discuss mobile/web development, or just want to say hello? I'd love to hear from you! <br /> <br />
            Fill out the form or reach out directly on any of the social media channels.
          </p>

          <ul className="space-y-4 mt-8 items-center cursor-pointer text-lg">
            <li className="w-fit">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/iyke-e"
                className="flex items-center gap-4 hover:text-accent transition duration-300"
              >
                <FaGithub className="w-8 h-8" />
                <span>github.com/iyke-e</span>
              </a>
            </li>
            <li className="w-fit">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/iyke-gp"
                className="flex items-center gap-4 hover:text-accent transition duration-300"
              >
                <FaLinkedin className="w-8 h-8" />
                <span>linkedin.com/in/iyke-gp</span>
              </a>
            </li>
            <li className="flex items-center gap-4 w-fit hover:text-accent transition duration-300">
              <TfiEmail className="w-8 h-8" />
              <span>egwimikechukwu.gp@gmail.com</span>
            </li>
          </ul>
        </div>

        <form 
          onSubmit={(e) => e.preventDefault()} 
          className="grid gap-8 border rounded-lg border-white/20 px-6 py-8 max-w-120 bg-white/5 backdrop-blur-sm"
        >
          <div className="grid gap-2">
            <label className="text-sm font-medium text-white/80">Name</label>
            <input
              className="border-b outline-0 border-white/20 px-4 py-2 text-white focus:border-accent transition bg-transparent"
              placeholder="Your Name"
              type="text"
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-white/80">Email</label>
            <input
              className="border-b outline-0 border-white/20 px-4 py-2 text-white focus:border-accent transition bg-transparent"
              placeholder="your.email@example.com"
              type="email"
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-white/80">Message</label>
            </div>
            <textarea
              maxLength={1000}
              className="border outline-0 h-32 border-white/20 rounded-xl px-4 py-2 text-white focus:border-accent bg-transparent transition"
              placeholder="Tell me about your project..."
              required
            ></textarea>
          </div>

          <Button className="flex gap-4 justify-center items-center font-medium">
            <FiSend /> Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;

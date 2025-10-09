import Button from "@/components/ui/Button";
import React from "react";
import { FiSend } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import PagesHero from "@/components/ui/PagesHero";

const Contact = () => {
  return (
    <div className="">
      <PagesHero title="Contact." />

      <div className="grid pad-auto py-10 gap-6 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-3xl mb-4 md:text-5xl max-w-200 md:leading-18">
            Let's get in touch
          </h1>
          <p>
            Have a project, question, or just want to say hi? <br /> <br /> I’d
            love to hear from you! <br /> <br />
            Fill out the form below or reach me directly via email any of the
            social media.
          </p>

          <ul className=" space-y-3 mt-8 items-center cursor-pointer">
            <li className="w-fit ">
              <a
                target="_blank"
                href="https://github.com/iyke-e"
                className="flex items-center gap-4"
              >
                <FaGithub className="w-8 h-8" />
                <span>github.com/iyke-e</span>
              </a>
            </li>
            <li className="w-fit">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/iyke-gp"
                className="flex items-center gap-4"
              >
                <FaLinkedin className="w-8 h-8" />
                <p>linkedin.com/in/iyke-gp</p>
              </a>
            </li>
            <li className="flex items-center gap-4 w-fit">
              <TfiEmail className="w-8 h-8" />
              <p>egwimikechukwu.gp@gmail.com</p>
            </li>
          </ul>
        </div>

        <form className="grid gap-8 border rounded-lg border-white/20  px-4 py-8 max-w-100">
          <div className="grid gap-2">
            <label htmlFor="">Name</label>
            <input
              className="border-b outline-0 border-white/20 px-4 py-2"
              placeholder="Your Name"
              type="text"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="">Email</label>
            <input
              className="border-b outline-0 border-white/20 px-4 py-2"
              placeholder="your.email@example.com"
              type="email"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="">Message</label>
              <p className="text-white/50">0/1000</p>
            </div>
            <textarea
              maxLength={150}
              className="border outline-0 h-30 border-white/20 rounded-xl px-4 py-2"
              name=""
              id=""
            ></textarea>
          </div>

          <Button className="flex gap-4 justify-center items-center">
            <FiSend /> Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

import Link from "next/link";
import React from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Connect = () => {
  return (
    <div className="pad-auto border-t border-white/10 py-14 space-y-6 items-center">
      <h1 className="text-4xl mx-auto max-w-[800px] md:text-6xl leading-12 md:leading-18 text-center ">
        Your vision deserves more than another template.
      </h1>
      <p className="mx-auto text-center">
        Let’s collaborate to turn ideas into experiences people remember.
      </p>

      <div className="grid  place-content-center">
        <Link href="/contact" className="text-center">
          <div className="flex  bg-white/20 rounded-[500px] p-2 pr-6 gap-2 w-fit h-fit pl-2 items-center">
            <div className="bg-background w-12 h-12 grid place-content-center rounded-full">
              <MdOutlineKeyboardDoubleArrowRight className="w-8 h-8" />
            </div>
            Let’s Work Together
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Connect;

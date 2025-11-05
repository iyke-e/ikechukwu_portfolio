import { stackList } from "@/data/stacklist";
import Image from "next/image";
import React from "react";

const GlidingStack = () => {
  const duplicateStackList = [...stackList, ...stackList];

  return (
    <div className="sliderparent overflow-hidden  mb-5 ">
      <ul className="flex slider w-max border-t  border-b py-3 border-white/20">
        {duplicateStackList.map((stack, index) => (
          <li
            className="flex mr-4 gap-2 grow-0 shrink-0 opacity-80 items-center border border-white/15 rounded-4xl bg-white/10 px-4 py-2 "
            key={index}
          >
            <Image
              src={stack.icon.src}
              width={15}
              height={15}
              alt={stack.name + "icon"}
            />
            <p className="text-sm">{stack.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlidingStack;

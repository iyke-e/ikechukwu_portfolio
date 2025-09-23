import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

type MobileMenuProp = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  removeScroll: () => void;
};

const MobileMenu = ({
  menuOpen,
  setMenuOpen,
  removeScroll,
}: MobileMenuProp) => {
  const closeMenu = () => {
    setMenuOpen(false);
    removeScroll();
  };
  return (
    <div className="space-y-12 px-4 py-4 absolute w-full h-[calc(100dvh-60px)] bg-background/70 backdrop-blur-lg">
      <div>
        <p className="text-sm text-gray-400 mb-6">Menu</p>
        <nav>
          <ul className="grid gap-6">
            <li>
              <Link
                onClick={closeMenu}
                className="text-2xl hover:text-gray-500"
                href={"/portfolio"}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                onClick={closeMenu}
                className="text-2xl hover:text-gray-500"
                href={"/about"}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                onClick={closeMenu}
                className="text-2xl hover:text-gray-500"
                href={"/contact"}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-6">Connect</p>
        <nav>
          <ul className="grid gap-6">
            <li>
              <a
                className="text-2xl hover:text-gray-500"
                target="_blank"
                href={"/Egwim_Ikechukwu_Resume.pdf"}
              >
                Resume
              </a>
            </li>
            <li>
              <a
                className="text-2xl hover:text-gray-500"
                target="_blank"
                href={"https://linkedin.com/in/iyke-gp"}
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                className="text-2xl hover:text-gray-500"
                target="_blank"
                href={"https://github.com/iyke-e"}
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;

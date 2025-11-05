import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

type MobileMenuProp = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  onCloseFinish: Dispatch<SetStateAction<boolean>>;
  removeScroll: () => void;
};

const MobileMenu = ({
  menuOpen,
  setMenuOpen,
  removeScroll,
  onCloseFinish,
}: MobileMenuProp) => {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    if (menuOpen) {
      tl.fromTo(
        "#menu-container",
        { scaleY: 0, transformOrigin: "top", opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.6 }
      ).from(
        "#link",
        {
          x: "-120%",
          opacity: 0,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.1"
      );
    } else {
      tl.to("#link", {
        x: "-120%",
        opacity: 0,
        stagger: { each: 0.08, from: "end" },
        ease: "power2.in",
      }).to(
        "#menu-container",
        {
          scaleY: 0,
          opacity: 0,
          transformOrigin: "top",
          duration: 0.2,
          onComplete: onCloseFinish,
        },
        "-=0.1"
      );
    }
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    removeScroll();
  };

  return (
    <div
      id="menu-container"
      className="space-y-12  px-4 py-4 absolute w-full h-[calc(100dvh-60px)] bg-background"
    >
      <div>
        <p className="text-sm text-gray-400 mb-6">Menu</p>
        <nav>
          <ul className="grid gap-6">
            <li id="link">
              <Link
                onClick={closeMenu}
                className="text-2xl hover:text-gray-500"
                href={"/portfolio"}
              >
                Portfolio
              </Link>
            </li>
            <li id="link">
              <Link
                onClick={closeMenu}
                className="text-2xl hover:text-gray-500"
                href={"/about"}
              >
                About
              </Link>
            </li>
            <li id="link">
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
            <li id="link">
              <a
                className="text-2xl hover:text-gray-500"
                target="_blank"
                href={"/Ikechukwu_Egwim_cv.pdf"}
              >
                Resume
              </a>
            </li>
            <li id="link">
              <a
                className="text-2xl hover:text-gray-500"
                target="_blank"
                href={"https://linkedin.com/in/iyke-gp"}
              >
                Linkedin
              </a>
            </li>
            <li id="link">
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

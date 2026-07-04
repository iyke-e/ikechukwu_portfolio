"use client";

import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Button from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import LogoIcon from "@/components/ui/LogoIcon";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["portfolio", "about", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      // If at the very top
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("stop-scroll");
    } else {
      document.body.classList.remove("stop-scroll");
    }
    return () => {
      document.body.classList.remove("stop-scroll");
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!menuOpen) setVisible(true);
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="fixed inset-x-0 bg-background/30 backdrop-blur-xs top-0 isolation-auto z-99999">
      <div className="flex justify-between items-center h-15 w-full max-w-[1400px] mx-auto px-4 md:px-8">
        <LogoIcon
          onClick={() => {
            setMenuOpen(false);
          }}
        />

        {/* mobile menu toggle */}
        <div
          onClick={() => {
            toggleMenu();
          }}
          className="flex gap-2 items-center md:hidden"
        >
          <p className="text-lg leading-0">Menu</p>
          {visible ? (
            <IoClose className="w-5 h-5" />
          ) : (
            <IoMenu className="w-5 h-5" />
          )}
        </div>

        {/* desktop navigation */}

        <nav className="hidden md:block">
          <ul className="flex gap-4 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${
                      isActive ? "text-accent border-b-2 border-accent" : ""
                    } hover:text-accent-hover font-semibold text-sm px-4 py-2 transition duration-600`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:block   cursor-pointer">
          <a target="_blank" href={"/Ikechukwu_Egwim_cv.pdf"}>
            <Button>Resume</Button>
          </a>
        </div>
      </div>
      {!visible ? (
        ""
      ) : (
        <MobileMenu
          onCloseFinish={() => setVisible(false)}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}
    </header>
  );
};

export default Header;

const navLinks = [
  { name: "Portfolio", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

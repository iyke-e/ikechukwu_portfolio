"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navLinks } from "./Header";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

type MobileMenuProp = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  onCloseFinish: Dispatch<SetStateAction<boolean>>;
};

const MobileMenu = ({
  menuOpen,
  setMenuOpen,
  onCloseFinish,
}: MobileMenuProp) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (menuOpen) {
        tl.fromTo(
          containerRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" }
        )
          .fromTo(
            ".mobile-link",
            { x: -24, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              stagger: 0.045,
              duration: 0.32,
              ease: "power2.out",
            },
            "-=0.15"
          )
          .fromTo(
            ".mobile-footer",
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
            "-=0.15"
          );
      } else {
        tl.to(containerRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
          onComplete: onCloseFinish,
        });
      }
    },
    { scope: containerRef, dependencies: [menuOpen, mounted] }
  );

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={containerRef}
      id="mobile-menu-container"
      style={{ backgroundColor: "var(--bg)" }}
      className="lg:hidden fixed inset-0 z-[9998] flex flex-col justify-between pt-24 pb-8 px-6 hairline-b overflow-y-auto overscroll-none touch-pan-y select-none"
      onTouchMove={(e) => {
        // Prevent touch scroll chaining to page behind
        e.stopPropagation();
      }}
    >
      <div>
        <p className="text-[11px] font-mono text-[var(--fg-3)] uppercase tracking-widest mb-8">
          // Navigation Index
        </p>
        <nav>
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => {
              const targetHref = isHome ? `#${link.id}` : `/#${link.id}`;
              return (
                <li key={link.id} className="mobile-link">
                  <Link
                    onClick={closeMenu}
                    className="flex items-baseline gap-4 text-3xl font-heading font-medium tracking-tight text-[var(--fg)] hover:text-[var(--red)] transition-colors py-1"
                    href={targetHref}
                  >
                    <span className="font-mono text-xs text-[var(--fg-3)]">
                      {link.num}
                    </span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mobile-footer pt-8 hairline-t space-y-5">
        <a
          onClick={closeMenu}
          target="_blank"
          rel="noopener noreferrer"
          href="/Ikechukwu_Egwim_cv.pdf"
          className="w-full py-3.5 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold uppercase tracking-wider text-center block hover:opacity-90 transition-opacity"
        >
          Download Resume PDF &darr;
        </a>

        <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-2)] pt-2">
          <span>LAGOS, NIGERIA</span>
          <div className="flex items-center gap-5">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/iyke-e"
              className="hover:text-[var(--red)] transition-colors"
            >
              GitHub
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://linkedin.com/in/iyke-gp"
              className="hover:text-[var(--red)] transition-colors"
            >
              LinkedIn
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/Ikechukwu_eg"
              className="hover:text-[var(--red)] transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileMenu;

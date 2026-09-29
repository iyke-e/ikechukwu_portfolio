"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { useTheme } from "@/hooks/useTheme";

export const navLinks = [
  { num: "01", name: "Work", id: "work" },
  { num: "02", name: "Services", id: "services" },
  { num: "03", name: "Approach", id: "approach" },
  { num: "04", name: "Journey", id: "journey" },
  { num: "05", name: "Stack", id: "stack" },
  { num: "06", name: "Contact", id: "contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [lagosTime, setLagosTime] = useState("");
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Live Lagos local time (WAT: UTC+1)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLagosTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);

      if (!isHome) return;

      const sectionIds = ["home", "work", "services", "approach", "journey", "stack", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 120) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Lock background page scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!menuOpen) setVisible(true);
    setMenuOpen(!menuOpen);
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      style={menuOpen ? { backgroundColor: "var(--bg)" } : undefined}
      className={`fixed inset-x-0 top-0 z-[9999] transition-all duration-300 ${
        menuOpen
          ? "bg-[var(--bg)] hairline-b"
          : hasScrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-md hairline-b"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="pad-auto flex justify-between items-center h-20">
        
        {/* Left: Brand & Studio Coordinates (Always routes back to Home) */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            onClick={() => {
              if (isHome) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="group flex flex-col text-left transition-opacity hover:opacity-80"
          >
            <span className="font-heading text-sm md:text-base font-semibold tracking-tight uppercase text-[var(--fg)]">
              Egwim Ikechukwu
            </span>
            <span className="font-mono text-[10px] text-[var(--fg-3)] tracking-wider">
              {lagosTime ? `LAGOS ${lagosTime} WAT` : "LAGOS, NIGERIA"}
            </span>
          </Link>

          {/* Minimalist Available Dot */}
          <div className="hidden sm:inline-flex items-center gap-2 pl-4 hairline-l py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-2)]">
              Available
            </span>
          </div>
        </div>

        {/* Center: Editorial Monospace Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const targetHref = isHome ? `#${link.id}` : `/#${link.id}`;
              const isActive = isHome && activeSection === link.id;

              return (
                <li key={link.id}>
                  <Link
                    href={targetHref}
                    className={`group flex items-baseline gap-1.5 text-xs tracking-wider transition-colors uppercase font-mono ${
                      isActive
                        ? "text-[var(--fg)] font-semibold"
                        : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                    }`}
                  >
                    <span className="text-[9px] text-[var(--fg-3)] group-hover:text-[var(--red)] transition-colors">
                      {link.num}
                    </span>
                    <span className="relative">
                      {link.name}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[var(--red)]" />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Theme Switcher + Resume + Mobile Hamburger */}
        <div className="flex items-center gap-4">
          
          {/* Dual Mode Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle between Ink and Paper theme"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hairline-all bg-[var(--surface)] text-[var(--fg)] text-[11px] font-mono tracking-wider transition-all hover:bg-[var(--surface-hover)] cursor-pointer"
            title="Switch theme"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                theme === "dark" ? "bg-[var(--red)]" : "bg-[var(--fg-3)]"
              }`}
            />
            <span className="uppercase font-semibold">
              {theme === "dark" ? "Ink" : "Paper"}
            </span>
            <span className="text-[9px] text-[var(--fg-3)]">
              / {theme === "dark" ? "Paper" : "Ink"}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-xs font-mono uppercase tracking-wider text-[var(--fg)] hover:text-[var(--red)] transition-colors cursor-pointer"
          >
            <span>{menuOpen ? "[ Close ]" : "[ Menu ]"}</span>
          </button>
        </div>
      </div>

      {visible && (
        <MobileMenu
          onCloseFinish={() => setVisible(false)}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}
    </header>
  );
}

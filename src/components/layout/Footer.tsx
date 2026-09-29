"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowUpRight, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="pt-24 pb-12 bg-[var(--bg)] hairline-t relative z-10 transition-colors">
      <div className="pad-auto">
        
        {/* Junca Studio Monumental Headline & Huge Email CTA */}
        <div className="pb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-3)] mb-4">
            // Direct Inquiries &amp; Collaborations
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-medium tracking-tight text-[var(--fg)] leading-[0.95] max-w-4xl mb-10">
            Have a project in mind? <br />
            <span className="text-[var(--red)]">Let&apos;s talk.</span>
          </h2>

          <a
            href="mailto:egwimikechukwu.gp@gmail.com"
            className="inline-flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-heading font-medium text-[var(--fg)] hover:text-[var(--red)] transition-colors junca-link"
          >
            <span>egwimikechukwu.gp@gmail.com</span>
            <FiArrowUpRight className="w-6 h-6 text-[var(--red)] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* 4-Column Minimalist Information Grid */}
        <div className="hairline-t pt-14 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Social Networks */}
          <div>
            <span className="font-mono text-xs text-[var(--fg-3)] uppercase tracking-wider block mb-4">
              // Socials
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-[var(--fg-2)]">
              <li>
                <a
                  href="https://github.com/iyke-e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors"
                >
                  <span className="text-[var(--fg-3)]">[01]</span>
                  <span>GitHub</span>
                  <FiArrowUpRight className="w-3 h-3 text-[var(--red)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/iyke-gp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors"
                >
                  <span className="text-[var(--fg-3)]">[02]</span>
                  <span>LinkedIn</span>
                  <FiArrowUpRight className="w-3 h-3 text-[var(--red)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/Ikechukwu_eg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors"
                >
                  <span className="text-[var(--fg-3)]">[03]</span>
                  <span>Twitter (X)</span>
                  <FiArrowUpRight className="w-3 h-3 text-[var(--red)]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Sitemap Navigation */}
          <div>
            <span className="font-mono text-xs text-[var(--fg-3)] uppercase tracking-wider block mb-4">
              // Sitemap
            </span>
            <ul className="space-y-2 font-mono text-xs text-[var(--fg-2)]">
              <li>
                <Link href="/#work" className="hover:text-[var(--fg)] transition-colors">
                  01 Selected Work
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[var(--fg)] transition-colors">
                  02 Disciplines
                </Link>
              </li>
              <li>
                <Link href="/#approach" className="hover:text-[var(--fg)] transition-colors">
                  03 Philosophy
                </Link>
              </li>
              <li>
                <Link href="/#journey" className="hover:text-[var(--fg)] transition-colors">
                  04 Chronology
                </Link>
              </li>
              <li>
                <Link href="/#stack" className="hover:text-[var(--fg)] transition-colors">
                  05 Technical Matrix
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[var(--fg)] transition-colors">
                  06 Transmission
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[var(--red)] transition-colors flex items-center gap-1">
                  <span>07 Projects Directory</span>
                  <FiArrowUpRight className="w-3 h-3 text-[var(--red)]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates & Studio Status */}
          <div>
            <span className="font-mono text-xs text-[var(--fg-3)] uppercase tracking-wider block mb-4">
              // Location
            </span>
            <div className="space-y-1.5 font-mono text-xs text-[var(--fg-2)]">
              <p className="text-[var(--fg)] font-medium">Lagos, Nigeria</p>
              <p>West Africa Time (WAT // GMT+1)</p>
              <p className="text-[var(--fg-3)]">6.5244° N, 3.3792° E</p>
              <p className="pt-2 text-[var(--red)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
                <span>Available for high-impact roles</span>
              </p>
            </div>
          </div>

          {/* Col 4: Top Action & Resume */}
          <div className="flex flex-col justify-between items-start lg:items-end">
            <div>
              <span className="font-mono text-xs text-[var(--fg-3)] uppercase tracking-wider block mb-4">
                // Actions
              </span>
              <a
                href="/Ikechukwu_Egwim_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-wider text-[var(--fg)] hover:text-[var(--red)] transition-colors block mb-3 junca-link"
              >
                Download Resume (PDF) &darr;
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 lg:mt-0 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--fg-2)] hover:text-[var(--fg)] transition-colors cursor-pointer group"
            >
              <span>Back to Top</span>
              <span className="w-7 h-7 rounded-full hairline-all flex items-center justify-center text-[var(--fg)] group-hover:border-[var(--red)] group-hover:text-[var(--red)] transition-colors">
                <FiArrowUp className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Minimal Copyright Bar */}
        <div className="hairline-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[var(--fg-3)]">
          <p>&copy; {new Date().getFullYear()} Egwim Ikechukwu. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with Next.js, Three.js &amp; Minimalist Principles</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
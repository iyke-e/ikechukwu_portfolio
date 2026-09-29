"use client";

import React, { useState, useEffect } from "react";
import { FiArrowUpRight, FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedAppName, setSelectedAppName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preserve existing custom event listener for "request-app-access"
  useEffect(() => {
    const handleRequest = (e: Event) => {
      const customEvent = e as CustomEvent<{ appName?: string }>;
      const appName = customEvent.detail?.appName || "Mobile";
      setSelectedAppName(appName);
      setMessage(`Hi Ikechukwu, I would like to request access to the ${appName} mobile app to test it out.`);
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("request-app-access", handleRequest);
    return () => {
      window.removeEventListener("request-app-access", handleRequest);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = selectedAppName
      ? `Request App Access: ${selectedAppName}`
      : "Engineering Inquiry / Collaboration";

    const mailtoUrl = `mailto:egwimikechukwu.gp@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name || "N/A"}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoUrl;
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  return (
    <section id="contact" className="py-24 hairline-b scroll-mt-20">
      <div className="pad-auto">
        
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--fg-3)] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />
          // 06 Direct Inquiries
        </div>

        {/* 2-Column Minimalist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-6">
          
          {/* Left Column: Direct Coordinates & Invitation */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[var(--fg)] leading-tight mb-6">
                Let&apos;s build something <span className="text-[var(--red)]">exceptional</span> together.
              </h2>
              <p className="text-sm md:text-base text-[var(--fg-2)] leading-relaxed mb-10 font-normal">
                Open for high-impact mobile development contracts, technical leadership roles, and ambitious digital ventures. Based in Lagos, operating seamlessly across international timezones.
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="space-y-4 font-mono text-xs">
              <a
                href="mailto:egwimikechukwu.gp@gmail.com"
                className="flex items-center justify-between p-4 rounded-xl hairline-all bg-[var(--surface)]/40 hover:bg-[var(--surface)] hover:border-[var(--fg-3)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <FiMail className="w-4 h-4 text-[var(--red)]" />
                  <span className="text-[var(--fg)]">egwimikechukwu.gp@gmail.com</span>
                </div>
                <FiArrowUpRight className="w-4 h-4 text-[var(--fg-3)] group-hover:text-[var(--red)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="tel:+2348107027244"
                className="flex items-center justify-between p-4 rounded-xl hairline-all bg-[var(--surface)]/40 hover:bg-[var(--surface)] hover:border-[var(--fg-3)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <FiPhone className="w-4 h-4 text-[var(--red)]" />
                  <span className="text-[var(--fg)]">+234 810 702 7244</span>
                </div>
                <FiArrowUpRight className="w-4 h-4 text-[var(--fg-3)] group-hover:text-[var(--red)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <div className="p-4 rounded-xl hairline-all bg-[var(--surface)]/20 grid grid-cols-2 gap-4 text-[11px] text-[var(--fg-3)]">
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-3.5 h-3.5 text-[var(--fg-2)]" />
                  <span>LAGOS, NIGERIA</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="w-3.5 h-3.5 text-[var(--fg-2)]" />
                  <span>GMT+1 (WAT)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Minimalist Inquiry Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-2xl hairline-all bg-[var(--surface)]/30 space-y-6"
            >
              {selectedAppName && (
                <div className="p-3.5 rounded-xl hairline-all bg-[var(--surface)] text-xs font-mono text-[var(--fg)] flex items-center justify-between">
                  <span>Testing access request for: <strong className="text-[var(--red)]">{selectedAppName}</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAppName("");
                      setMessage("");
                    }}
                    className="text-[var(--fg-3)] hover:text-[var(--fg)] text-xs"
                  >
                    [ Clear ]
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-3)] block"
                >
                  Your Name <span className="opacity-50">(Optional)</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-4 py-3.5 rounded-xl hairline-all bg-[var(--bg)] text-[var(--fg)] text-sm outline-none focus:border-[var(--red)] transition-colors placeholder:text-[var(--fg-3)]/50"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-3)] block"
                >
                  Email Address <span className="text-[var(--red)]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maya@studio.com"
                  className="w-full px-4 py-3.5 rounded-xl hairline-all bg-[var(--bg)] text-[var(--fg)] text-sm outline-none focus:border-[var(--red)] transition-colors placeholder:text-[var(--fg-3)]/50"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-3)] block"
                >
                  Project Scope / Message <span className="text-[var(--red)]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly describe your mobile app, web product, or timeline..."
                  className="w-full px-4 py-3.5 rounded-xl hairline-all bg-[var(--bg)] text-[var(--fg)] text-sm outline-none focus:border-[var(--red)] transition-colors placeholder:text-[var(--fg-3)]/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "Launching Email Client..." : "Send Transmission"}</span>
                <FiArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

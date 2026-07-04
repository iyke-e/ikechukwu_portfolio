import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const metadata: Metadata = {
  title: "Ikechukwu Egwim Portfolio Website",
  description:
    "Explore Ikechukwu’s portfolio: innovative web and mobile apps, frontend development, and projects showcasing modern software solutions.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={`antialiased`}>
        <div className="relative min-h-screen noise-bg w-full">
          <Header />
          <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-15">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

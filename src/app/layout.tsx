import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/hooks/useTheme";

export const metadata: Metadata = {
  title: "Egwim Ikechukwu — Software Engineer & Product Craftsman",
  description:
    "Creative engineering studio portfolio of Egwim Ikechukwu: crafting minimalist, high-performance cross-platform mobile apps, reactive web platforms, and AI systems.",
  icons: {
    icon: "/logo.svg",
  },
  keywords: [
    "Ikechukwu Egwim",
    "Full Stack Developer",
    "Mobile Developer",
    "React Native",
    "Flutter",
    "Next.js",
    "Minimalist Portfolio",
    "Junca Studio Style",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth" data-theme="dark">
      <body className="antialiased junca-grain bg-[var(--bg)] text-[var(--fg)] overflow-x-hidden">
        <ThemeProvider>
          <CustomCursor />
          <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between">
            <Header />
            <div className="w-full flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

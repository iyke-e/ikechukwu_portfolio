import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

export const metadata: Metadata = {
  title: "Iykee Portfolio",
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

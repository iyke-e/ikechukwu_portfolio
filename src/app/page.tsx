import Hero from "@/components/home/hero/Hero";
import Projects from "@/components/home/Project/Projects";
import ServicesSection from "@/components/home/Services/ServicesSection";
import ApproachSection from "@/components/home/Philosophy/ApproachSection";
import ExperienceSection from "@/components/home/Experience/ExperienceSection";
import SkillsSection from "@/components/home/Skills/SkillsSection";
import ContactSection from "@/components/home/Contact/ContactSection";
export default function Home() {
  return (
    <main className="min-h-screen relative w-full">
      {/* 00. Hero / Editorial Introduction */}
      <Hero />

      {/* 01. Selected Works / Projects Showcase */}
      <Projects />

      {/* 02. Engineering Disciplines & Services */}
      <ServicesSection />

      {/* 03. Engineering Philosophy & Approach */}
      <ApproachSection />

      {/* 04. Career Chronology & Milestone Ledger */}
      <ExperienceSection />

      {/* 05. Technical Matrix & Toolchain */}
      <SkillsSection />

      {/* 06. Direct Inquiries & Contact Transmission */}
      <ContactSection />
    </main>
  );
}

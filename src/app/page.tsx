import Hero from "@/components/home/hero/Hero";
import Projects from "@/components/home/Project/Projects";
import MyStory from "@/components/about/MyStory";
import TechStack from "@/components/home/About/TechStack";
import FullExperience from "@/components/about/FullExperience";
import ContactSection from "@/components/home/ContactSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Home() {
  return (
    <main className="min-h-screen pb-10 pt-15">
      <Hero />
      <Projects />

      {/* About Section */}
      <section id="about" className="border-t border-white/10 pt-16">
        <SectionHeader title="About Me" subtitle="Meet the developer" />
        <MyStory />
        <TechStack />
        {/* <FullExperience /> */}
      </section>

      {/* Contact Form Section */}
      <ContactSection />
    </main>
  );
}

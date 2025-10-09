import AboutMe from "@/components/home/About/AboutMe";
import TechStack from "@/components/home/About/TechStack";
import Connect from "@/components/home/Connect";
import Experience from "@/components/home/Experience";
import Hero from "@/components/home/hero/Hero";
import Projects from "@/components/home/Project/Projects";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutMe />
      <TechStack />
      <Projects />

      <Connect />
    </div>
  );
}

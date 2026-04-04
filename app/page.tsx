import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroScrolly } from "@/components/HeroScrolly";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[#121212]">
        <HeroScrolly />
        <Skills />
        <Experience />
        <Projects />
        <Education />
      </main>
      <Footer />
    </>
  );
}

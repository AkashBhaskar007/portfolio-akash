 "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroScrolly } from "@/components/HeroScrolly";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";

export default function Home() {
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [sequenceReady, setSequenceReady] = useState(false);

  useEffect(() => {
    const onLoad = () => setWindowLoaded(true);
    if (document.readyState === "complete") {
      onLoad();
      return;
    }
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const appReady = windowLoaded && sequenceReady;

  return (
    <>
      {!appReady && (
        <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-5 bg-[#121212] px-4 text-center">
          <div className="preloader-avatar relative h-36 w-36 overflow-hidden rounded-full border border-white/20">
            <Image
              src="/akash-profile.png"
              alt="Akash Bhaskar"
              fill
              sizes="144px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-wide text-white">Akash Bhaskar</p>
            <p className="text-sm text-white/70">Software Developer</p>
          </div>
        </div>
      )}

      <div
        style={{
          opacity: appReady ? 1 : 0,
          visibility: appReady ? "visible" : "hidden",
          transition: "opacity 0.35s ease",
        }}
      >
        <Header />
        <main className="bg-[#121212]">
          <HeroScrolly onSequenceReady={() => setSequenceReady(true)} />
          <Skills />
          <Experience />
          <Projects />
          <Education />
        </main>
        <Footer />
      </div>
    </>
  );
}

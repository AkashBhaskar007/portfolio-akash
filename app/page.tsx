"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroScrolly } from "@/components/HeroScrolly";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { FloatingDoodles } from "@/components/FloatingDoodles";

export default function Home() {
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [sequenceReady, setSequenceReady] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const mainRef = useRef<HTMLElement>(null);
  const wheelLockRef = useRef(false);

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

  const snapToAdjacentSection = useCallback((direction: "next" | "prev") => {
    const container = mainRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>('[data-snap-section="true"]'),
    );
    if (sections.length === 0) return;

    const containerTop = container.getBoundingClientRect().top;
    const currentIndex = sections.findIndex((section) => {
      const top = section.getBoundingClientRect().top - containerTop;
      return Math.abs(top) < 2;
    });

    const fallbackIndex =
      currentIndex >= 0
        ? currentIndex
        : Math.min(
            sections.length - 1,
            Math.max(
              0,
              Math.round(container.scrollTop / container.clientHeight),
            ),
          );

    const targetIndex =
      direction === "next"
        ? Math.min(fallbackIndex + 1, sections.length - 1)
        : Math.max(fallbackIndex - 1, 0);

    const target = sections[targetIndex];
    if (!target || target === sections[fallbackIndex]) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();

      if (wheelLockRef.current) return;
      wheelLockRef.current = true;

      snapToAdjacentSection(event.deltaY > 0 ? "next" : "prev");

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 700);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [snapToAdjacentSection]);

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    let ticking = false;
    const updateActiveSection = () => {
      const sections = Array.from(
        container.querySelectorAll<HTMLElement>('[data-snap-section="true"]'),
      );
      if (sections.length === 0) return;

      const containerTop = container.getBoundingClientRect().top;
      const closest = sections.reduce(
        (best, section) => {
          const offset = Math.abs(
            section.getBoundingClientRect().top - containerTop,
          );
          if (!best || offset < best.offset) return { id: section.id, offset };
          return best;
        },
        null as { id: string; offset: number } | null,
      );

      if (closest?.id) {
        setActiveSection(`#${closest.id}`);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    updateActiveSection();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {!appReady && (
        <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-5 bg-[#121212] px-4 text-center">
          <div className="preloader-avatar relative h-36 w-36 overflow-hidden rounded-full border border-white/20">
            <Image
              src="/akash-profile.webp"
              alt="Akash Bhaskar"
              fill
              sizes="144px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-wide text-white">
              Akash Bhaskar
            </p>
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
        <FloatingDoodles />
        <Header activeSection={activeSection} />
        <main
          ref={mainRef}
          className="snap-container bg-[#121212]"
          aria-label="Full page sections"
        >
          <HeroScrolly onSequenceReady={() => setSequenceReady(true)} />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Footer />
        </main>
      </div>
    </>
  );
}

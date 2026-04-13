"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useMotionValue } from "framer-motion";
import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { Overlay } from "@/components/Overlay";

type HeroScrollyProps = {
  scrollContainerRef: RefObject<HTMLElement | null>;
  onSequenceReady?: () => void;
};

export function HeroScrolly({
  scrollContainerRef,
  onSequenceReady,
}: HeroScrollyProps) {
  const scrollTargetRef = useRef<HTMLElement>(null);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const section = scrollTargetRef.current;
    if (!container || !section) return;

    const updateProgress = () => {
      const start = section.offsetTop;
      const travel = section.offsetHeight - container.clientHeight;
      if (travel <= 0) {
        scrollProgress.set(0);
        return;
      }
      const raw = (container.scrollTop - start) / travel;
      const clamped = Math.max(0, Math.min(1, raw));
      scrollProgress.set(clamped);
    };

    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(container);
    resizeObserver.observe(section);

    container.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      container.removeEventListener("scroll", updateProgress);
      resizeObserver.disconnect();
    };
  }, [scrollContainerRef, scrollProgress]);

  return (
    <section
      ref={scrollTargetRef}
      id="home"
      data-snap-section="true"
      className="snap-section snap-section--scrolly-hero relative bg-[#121212]"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div className="relative h-full w-full overflow-hidden">
          <ScrollyCanvas
            scrollProgress={scrollProgress}
            onReady={onSequenceReady}
          />
          <Overlay scrollProgress={scrollProgress} />
        </div>
      </div>
    </section>
  );
}

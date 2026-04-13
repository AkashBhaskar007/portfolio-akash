"use client";

import { useRef, type RefObject } from "react";
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
            scrollContainerRef={scrollContainerRef}
            scrollTargetRef={scrollTargetRef}
            onReady={onSequenceReady}
          />
          <Overlay
            scrollContainerRef={scrollContainerRef}
            scrollTargetRef={scrollTargetRef}
          />
        </div>
      </div>
    </section>
  );
}

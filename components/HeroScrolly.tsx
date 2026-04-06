"use client";

import { useRef } from "react";
import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { Overlay } from "@/components/Overlay";

type HeroScrollyProps = {
  onSequenceReady?: () => void;
};

export function HeroScrolly({ onSequenceReady }: HeroScrollyProps) {
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  return (
    <section id="home" className="relative bg-[#121212]">
      <div ref={scrollTargetRef} className="relative h-[500vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ScrollyCanvas scrollTargetRef={scrollTargetRef} onReady={onSequenceReady} />
          <Overlay scrollTargetRef={scrollTargetRef} />
        </div>
      </div>
    </section>
  );
}

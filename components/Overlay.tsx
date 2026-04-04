"use client";

import { type RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type OverlayProps = {
  scrollTargetRef: RefObject<HTMLElement | null>;
};

export function Overlay({ scrollTargetRef }: OverlayProps) {
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start start", "end end"],
  });

  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.28, 0.34],
    [1, 1, 0.4, 0]
  );
  const introY = useTransform(scrollYProgress, [0, 0.34], [0, -48]);
  const introParallax = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const apisOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.30, 0.42, 0.52],
    [0, 1, 1, 0]
  );
  const apisY = useTransform(scrollYProgress, [0.22, 0.52], [40, -24]);
  const apisParallax = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const scaleOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.72, 0.82],
    [0, 1, 1, 0]
  );
  const scaleY = useTransform(scrollYProgress, [0.48, 0.82], [48, -32]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [0, -140]);

  const introCombinedY = useTransform(
    [introY, introParallax],
    ([a, b]: number[]) => a + b
  );
  const apisCombinedY = useTransform(
    [apisY, apisParallax],
    ([a, b]: number[]) => a + b
  );
  const scaleCombinedY = useTransform(
    [scaleY, scaleParallax],
    ([a, b]: number[]) => a + b
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden={false}
    >
      <motion.div
        className="absolute left-0 right-0 top-[38%] flex -translate-y-1/2 flex-col items-center px-6 text-center md:top-[40%]"
        style={{
          opacity: introOpacity,
          y: introCombinedY,
        }}
      >
        <motion.h1
          className="text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl"
          style={{ textShadow: "0 0 80px rgba(255,255,255,0.12)" }}
        >
          Akash Bhaskar
        </motion.h1>
        <p className="mt-3 text-lg text-white/60 md:text-xl">Software Developer</p>
      </motion.div>

      <motion.div
        className="absolute left-6 top-[46%] max-w-md md:left-14 md:top-[48%] md:max-w-xl lg:left-20"
        style={{
          opacity: apisOpacity,
          y: apisCombinedY,
        }}
      >
        <p className="text-2xl font-medium leading-snug text-white md:text-4xl lg:text-5xl">
          &ldquo;I build APIs.&rdquo;
        </p>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-white/40 to-transparent" />
      </motion.div>

      <motion.div
        className="absolute right-6 top-[58%] max-w-md text-right md:right-14 md:top-[56%] md:max-w-xl lg:right-20"
        style={{
          opacity: scaleOpacity,
          y: scaleCombinedY,
        }}
      >
        <p className="text-2xl font-medium leading-snug text-white md:text-4xl lg:text-5xl">
          Building scalable backend.
        </p>
        <div className="ml-auto mt-4 h-px w-24 bg-gradient-to-l from-white/40 to-transparent" />
      </motion.div>
    </div>
  );
}

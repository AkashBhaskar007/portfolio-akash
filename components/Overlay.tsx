"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

type OverlayProps = {
  scrollProgress: MotionValue<number>;
};

export function Overlay({ scrollProgress }: OverlayProps) {
  const introOpacity = useTransform(
    scrollProgress,
    [0, 0.18, 0.28, 0.34],
    [1, 1, 0.4, 0]
  );
  const introY = useTransform(scrollProgress, [0, 0.34], [0, -48]);
  const introParallax = useTransform(scrollProgress, [0, 1], [0, -120]);

  const introCombinedY = useTransform(
    [introY, introParallax],
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

    </div>
  );
}

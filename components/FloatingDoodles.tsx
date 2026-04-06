"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiStripe,
  SiSocketdotio,
  SiOpenai,
  SiSwagger,
} from "react-icons/si";
import { TbBrandAws } from "react-icons/tb";
import type { IconType } from "react-icons";

type Doodle = {
  Icon: IconType;
  size: number;
};

const doodles: Doodle[] = [
  { Icon: SiJavascript, size: 22 },
  { Icon: SiTypescript, size: 24 },
  { Icon: SiNodedotjs, size: 22 },
  { Icon: SiNestjs, size: 20 },
  { Icon: SiPostgresql, size: 22 },
  { Icon: SiMongodb, size: 21 },
  { Icon: SiRedis, size: 20 },
  { Icon: SiDocker, size: 25 },
  { Icon: SiStripe, size: 22 },
  { Icon: SiSocketdotio, size: 22 },
  { Icon: SiOpenai, size: 26 },
  { Icon: SiSwagger, size: 23 },
  { Icon: TbBrandAws, size: 24 },
];

export function FloatingDoodles() {
  const tracks = useMemo(
    () =>
      doodles.map(() => {
        const fromLeft = Math.random() > 0.5;
        const startY = 6 + Math.random() * 84;
        const midY = 8 + Math.random() * 80;
        const endY = 6 + Math.random() * 84;
        const duration = 16 + Math.random() * 12;
        const delay = Math.random() * 10;
        const opacity = 0.16 + Math.random() * 0.12;
        return { fromLeft, startY, midY, endY, duration, delay, opacity };
      }),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[8] hidden overflow-hidden sm:block">
      {doodles.map(({ Icon, size }, idx) => {
        const track = tracks[idx];
        const startX = track.fromLeft ? "-12vw" : "112vw";
        const endX = track.fromLeft ? "112vw" : "-12vw";
        return (
        <motion.div
          key={`doodle-${idx}`}
          className="absolute"
          style={{ color: `rgba(229,231,235,${track.opacity})` }}
          initial={{
            left: startX,
            top: `${track.startY}vh`,
            opacity: 0,
          }}
          animate={{
            left: endX,
            top: [`${track.startY}vh`, `${track.midY}vh`, `${track.endY}vh`],
            opacity: [0, 1, 1, 0],
            rotate: [0, 7, 0, -6, 0],
            scale: [0.92, 1.04, 1, 0.96, 0.92],
          }}
          transition={{
            duration: track.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: track.delay,
          }}
        >
          <Icon size={size} />
        </motion.div>
        );
      })}
    </div>
  );
}

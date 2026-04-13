"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  { title: "Homestalgia", logo: "/project-logos/homestalgia-logo.png" },
  { title: "Merity", logo: "/project-logos/merity-logo.png" },
  { title: "STARRY 3 Point Contest", logo: "/project-logos/starry-logo.png" },
  { title: "Zimpex", logo: "/project-logos/zimpex-logo.png" },
  { title: "FALC AI", logo: "/project-logos/falc-ai-logo.png" },
  { title: "Skizi", logo: "/project-logos/skizi-logo.png" },
  { title: "SafeShare", logo: "/project-logos/safeshare.png" },
  { title: "SecretSauce", logo: "/project-logos/secretsauce.png" },
  { title: "Strawz", logo: "/project-logos/strawz.png" },
  { title: "CrewOne", logo: "/project-logos/crewone.png" },
];

const firstRowProjects = projects.slice(0, 5);
const secondRowProjects = projects.slice(5, 10);

export function Projects() {
  return (
    <section
      id="projects"
      data-snap-section="true"
      className="snap-section relative flex h-full flex-col justify-center bg-[#121212] px-4 py-16 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(168,85,247,0.08),transparent)]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80 [text-shadow:0_0_10px_rgba(252,211,77,0.55)]">
            Selected work
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-amber-300 [text-shadow:0_0_18px_rgba(252,211,77,0.6)] md:text-5xl">
            Projects
          </h2>
        </motion.div>

        <div className="relative mt-16 space-y-6 overflow-hidden md:space-y-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#121212] to-transparent md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#121212] to-transparent md:w-20" />
          <motion.div
            className="flex w-max items-center gap-12 py-1 md:gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {[...firstRowProjects, ...firstRowProjects].map(
              (project, index) => (
                <div
                  key={`${project.title}-${index}`}
                  className="relative h-24 w-56 shrink-0 md:h-28 md:w-64"
                >
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    fill
                    sizes="(min-width: 768px) 256px, 224px"
                    className="object-contain object-center"
                  />
                </div>
              ),
            )}
          </motion.div>
          <motion.div
            className="flex w-max items-center gap-12 py-1 md:gap-16"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {[...secondRowProjects, ...secondRowProjects].map(
              (project, index) => (
                <div
                  key={`${project.title}-row2-${index}`}
                  className="relative h-24 w-56 shrink-0 md:h-28 md:w-64"
                >
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    fill
                    sizes="(min-width: 768px) 256px, 224px"
                    className="object-contain object-center"
                  />
                </div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

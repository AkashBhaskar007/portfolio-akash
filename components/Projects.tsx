"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  { title: "Homestalgia", logo: "/project-logos/homestalgia-logo.png" },
  { title: "Merity", logo: "/project-logos/merity-logo.png" },
  { title: "STARRY 3 Point Contest", logo: "/project-logos/starry-logo.png" },
  { title: "Zimpex", logo: "/project-logos/zimpex-logo.png" },
];

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
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
            Selected work
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Projects
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-24 w-full md:h-28"
            >
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                fill
                sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
                className="object-contain object-center"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

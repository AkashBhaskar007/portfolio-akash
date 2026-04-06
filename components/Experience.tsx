"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";

const roles = [
  {
    company: "Revyrie Global Tech Solutions",
    location: "Trivandrum, Kerala",
    title: "Software Engineer",
    period: "May 2023 – Present",
    highlights: [
      "Backend across 8 projects; led backend team with Node.js and NestJS.",
      "Agile delivery with cross-functional collaboration.",
      "PostgreSQL & MongoDB architecture; ~30% query gains via optimized CRUD.",
      "Stripe, Google Maps, and third-party integrations.",
      "Production incident response and reliability for global clients.",
      "Mentored juniors on backend quality and system design.",
    ],
  },
  {
    company: "Accubits Technologies Inc",
    location: "Trivandrum, Kerala",
    title: "Junior Software Engineer",
    period: "Aug 2021 – Apr 2023",
    highlights: [
      "Built and integrated 20+ RESTful APIs for frontend–backend flows.",
      "Cut API latency by ~200ms via targeted fixes and testing.",
      "Documentation for clarity and handover.",
      "Git, GitHub, GitLab, and Bitbucket in team workflows.",
      "Supported senior engineers for on-time delivery.",
    ],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      data-snap-section="true"
      className="snap-section relative flex h-full flex-col justify-center bg-[#121212] px-4 py-16 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(59,130,246,0.08),transparent)]" />

      <div className="relative mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
            Career
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Experience
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-white/25 via-white/10 to-transparent md:left-[15px]" />

          <ul className="space-y-12">
            {roles.map((job, i) => (
              <motion.li
                key={job.company}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-10 md:pl-14"
              >
                <span className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5 shadow-[0_0_20px_-4px_rgba(255,255,255,0.35)] md:top-3 md:h-8 md:w-8">
                  <Briefcase className="h-3 w-3 text-white/70 md:h-3.5 md:w-3.5" />
                </span>

                <article className="group glass glass-hover rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white md:text-2xl">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-white/80">{job.company}</p>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-white/45">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location} · {job.period}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-0 max-h-0 space-y-3 overflow-hidden text-sm leading-relaxed text-white/55 opacity-0 transition-all duration-300 ease-out group-hover:mt-6 group-hover:max-h-[340px] group-hover:opacity-100 md:text-base">
                    {job.highlights.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/35" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

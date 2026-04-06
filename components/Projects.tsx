"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Homestalgia",
    subtitle: "Property story sharing platform",
    description:
      "RESTful APIs for listings, search, filtering, and story sharing with analytics for engagement. Event-driven jobs via BullMQ (email, retries, scheduling). JWT with multi-tier RBAC for users, professionals, and admins.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "BullMQ", "AWS S3", "New Relic"],
  },
  {
    title: "SafeShare",
    subtitle: "Online consulting platform",
    description:
      "Real-time collaboration with Socket.IO and Redis-backed scaling. Stripe subscriptions, AWS S3 presigned media, Firebase push. JWT, OAuth (Google, Facebook), and Passport strategies for web and mobile.",
    stack: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "TypeORM",
      "AWS",
      "Socket.io",
      "Stripe",
      "Firebase",
    ],
  },
  {
    title: "STARRY 3 Point Contest",
    subtitle: "NBA All-Star live event",
    description:
      "Matchup session management, player assignments, dynamic scoreboards, CSV export, and historical analysis. Dockerized CI/CD, global exception handling, TypeORM migrations, and Swagger-backed APIs.",
    stack: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "TypeORM",
      "JWT",
      "AWS S3",
      "Swagger",
      "Docker",
    ],
  },
];

const card = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Projects() {
  return (
    <section
      id="projects"
      data-snap-section="true"
      className="snap-section relative h-full bg-[#121212] px-4 py-16 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(168,85,247,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
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
          <p className="mt-4 text-lg text-white/50">
            Production backends: APIs, real-time features, payments, and cloud operations.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              custom={i}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="group relative glass glass-hover flex flex-col rounded-2xl p-6 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] md:p-8"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-opacity duration-500 group-hover:opacity-100 group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_0_60px_-20px_rgba(255,255,255,0.12)]" />
              <h3 className="text-xl font-semibold text-white md:text-2xl">{p.title}</h3>
              <p className="mt-1 text-sm text-white/45">{p.subtitle}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">
                {p.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-white/65"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

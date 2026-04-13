"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function Education() {
  return (
    <section
      id="education"
      data-snap-section="true"
      className="snap-section relative flex h-full flex-col justify-center bg-[#121212] px-4 py-16 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(34,197,94,0.06),transparent)]" />

      <div className="relative mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-fuchsia-300/80 [text-shadow:0_0_10px_rgba(240,171,252,0.55)]">
            Academics
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-fuchsia-300 [text-shadow:0_0_18px_rgba(240,171,252,0.6)] md:text-5xl">
            Education
          </h2>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="glass glass-hover mt-14 rounded-2xl p-8 md:p-10"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_0_40px_-12px_rgba(255,255,255,0.2)]">
              <GraduationCap className="h-7 w-7 text-white/80" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-2xl font-semibold text-white md:text-3xl">
                Bachelor of Technology
              </h3>
              <p className="mt-2 text-lg text-white/70">
                Electronics and Communication Engineering
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-white/50">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-white/40" />
                  TKM College of Engineering, Kollam
                </span>
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/45">
                <Calendar className="h-4 w-4 text-white/40" />
                2017 – 2021
              </p>
            </div>
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-5 text-sm text-white/45"
        >
          <p className="font-medium text-white/60">Certifications & highlights</p>
          <ul className="mt-3 space-y-2">
            <li>Best Project Award — Revyrie Global Tech Solutions (2023)</li>
            <li>Udemy — All About Node.js</li>
            <li>HackerRank — JavaScript</li>
            <li>Udemy — Introduction to Postman and API Testing</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

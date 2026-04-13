"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Homestalgia",
    logo: "/project-logos/homestalgia-logo.png",
    logoClassName: "object-contain object-left",
    glow: "rgba(16, 185, 129, 0.45)",
    subtitle: "Property story sharing platform",
    description:
      "RESTful APIs for listings, search, filtering, and story sharing with analytics for engagement. Event-driven jobs via BullMQ (email, retries, scheduling). JWT with multi-tier RBAC for users, professionals, and admins.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "BullMQ", "AWS S3", "New Relic"],
  },
  {
    title: "SafeShare",
    glow: "rgba(59, 130, 246, 0.45)",
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
    logo: "/project-logos/starry-logo.png",
    logoClassName:
      "object-contain object-left scale-[1.12] mix-blend-screen brightness-110 contrast-125",
    glow: "rgba(244, 63, 94, 0.45)",
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
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const floatingCardRef = useRef<HTMLElement | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const [canHover, setCanHover] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [targetRect, setTargetRect] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const clearHoverTimer = () => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const openCard = (index: number) => {
    const cardElement = cardRefs.current[index];
    if (!cardElement) return;
    const rect = cardElement.getBoundingClientRect();
    setOriginRect(rect);
    setTargetRect({ top: rect.top, left: rect.left, width: rect.width });
    setExpandedIndex(index);
  };

  const handleCardEnter = (index: number) => {
    if (!canHover) return;
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      openCard(index);
      hoverTimerRef.current = null;
    }, 450);
  };

  const closeExpandedCard = () => {
    clearHoverTimer();
    setExpandedIndex(null);
    setTargetRect(null);
  };

  useEffect(() => clearHoverTimer, []);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (expandedIndex === null) return;

    const handleScrollOrWheel = () => closeExpandedCard();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeExpandedCard();
    };

    window.addEventListener("wheel", handleScrollOrWheel, { passive: true });
    window.addEventListener("scroll", handleScrollOrWheel, { passive: true });
    window.addEventListener("touchmove", handleScrollOrWheel, {
      passive: true,
    });
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("wheel", handleScrollOrWheel);
      window.removeEventListener("scroll", handleScrollOrWheel);
      window.removeEventListener("touchmove", handleScrollOrWheel);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [expandedIndex]);

  const expandedProject = expandedIndex !== null ? projects[expandedIndex] : null;

  const handleSectionMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (expandedIndex === null) return;
    const popup = floatingCardRef.current;
    if (!popup) return;
    if (!popup.contains(event.target as Node)) {
      closeExpandedCard();
    }
  };

  const renderCardContent = (
    project: (typeof projects)[number],
    showDetails: boolean,
  ) => (
    <>
      <div className="flex items-start justify-between gap-3">
        {project.logo ? (
          <div className="relative h-12 w-[190px] shrink-0 md:h-14 md:w-[230px]">
            <Image
              src={project.logo}
              alt={`${project.title} logo`}
              fill
              sizes="230px"
              className={project.logoClassName ?? "object-contain object-left"}
            />
          </div>
        ) : (
          <h3 className="text-xl font-semibold text-white md:text-2xl">{project.title}</h3>
        )}
      </div>
      <div
        className={`transition-all duration-300 ${
          showDetails
            ? "mt-1 max-h-80 opacity-100"
            : "mt-0 max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <p className="text-sm text-white/45">{project.subtitle}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">
          {project.description}
        </p>
      </div>
      <div
        className={`flex flex-wrap transition-all duration-300 ${
          showDetails
            ? "mt-6 max-h-52 gap-2 opacity-100"
            : "mt-0 max-h-0 gap-0 overflow-hidden opacity-0"
        }`}
      >
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-white/65"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <section
      id="projects"
      data-snap-section="true"
      className="snap-section relative flex h-full flex-col justify-center bg-[#121212] px-4 py-16 md:px-8"
      onMouseLeave={canHover ? closeExpandedCard : undefined}
      onMouseMove={canHover ? handleSectionMouseMove : undefined}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(168,85,247,0.08),transparent)]" />

      <div
        className={`relative mx-auto w-full max-w-7xl ${
          canHover && expandedIndex !== null ? "pointer-events-none" : ""
        }`}
      >
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
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onMouseEnter={canHover ? () => handleCardEnter(i) : undefined}
              onMouseLeave={canHover ? clearHoverTimer : undefined}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              style={{
                boxShadow: `0 0 34px -20px ${p.glow}, 0 12px 36px -26px rgba(0,0,0,0.9)`,
              }}
              className={`group relative glass glass-hover flex flex-col rounded-2xl !border-0 p-6 md:p-8 ${
                expandedIndex === i ? "invisible" : ""
              }`}
            >
              {renderCardContent(p, false)}
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {canHover && expandedProject && originRect && targetRect && (
          <>
            <motion.div
              className="pointer-events-none fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />

            <motion.article
              ref={floatingCardRef}
              className="glass pointer-events-auto fixed z-50 rounded-2xl !border-0 bg-white/[0.07] p-6 will-change-transform md:p-8"
              style={{
                top: originRect.top,
                left: originRect.left,
                width: originRect.width,
                boxShadow: `0 28px 90px -30px ${expandedProject.glow}, 0 16px 50px -30px rgba(0,0,0,0.92)`,
              }}
              initial={{
                top: originRect.top,
                left: originRect.left,
                width: originRect.width,
                scale: 1,
              }}
              animate={{
                top: targetRect.top,
                left: targetRect.left,
                width: targetRect.width,
                scale: 1.08,
              }}
              exit={{
                top: originRect.top,
                left: originRect.left,
                width: originRect.width,
                scale: 1,
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              onMouseLeave={closeExpandedCard}
            >
              {renderCardContent(expandedProject, true)}
            </motion.article>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

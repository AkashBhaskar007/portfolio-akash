"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiNestjs,
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiExpress,
  SiSocketdotio,
  SiStripe,
  SiRabbitmq,
  SiHtml5,
  SiSwagger,
  SiOpenai,
  SiGoogle,
  SiSendgrid,
  SiCplusplus,
  SiNewrelic,
} from "react-icons/si";
import { TbBrandAws } from "react-icons/tb";

const categories = [
  {
    title: "Languages & frameworks",
    headingIcon: SiJavascript,
    headingIconColor: "text-rose-300",
    glow: "rgba(253, 164, 175, 0.45)",
    items: [
      { name: "JavaScript", Icon: SiJavascript, color: "text-yellow-200/90" },
      { name: "TypeScript", Icon: SiTypescript, color: "text-blue-400" },
      { name: "Node.js", Icon: SiNodedotjs, color: "text-green-400" },
      { name: "Express.js", Icon: SiExpress, color: "text-white/80" },
      { name: "NestJS", Icon: SiNestjs, color: "text-red-400" },
      { name: "C++", Icon: SiCplusplus, color: "text-cyan-300" },
      { name: "HTML", Icon: SiHtml5, color: "text-orange-400" },
      { name: "React", Icon: SiReact, color: "text-cyan-400" },
      { name: "Next.js", Icon: SiNextdotjs, color: "text-white" },
    ],
  },
  {
    title: "Databases & ORMs",
    headingIcon: SiPostgresql,
    headingIconColor: "text-blue-300",
    glow: "rgba(147, 197, 253, 0.45)",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "text-sky-400" },
      { name: "MongoDB", Icon: SiMongodb, color: "text-green-500" },
      { name: "Redis", Icon: SiRedis, color: "text-red-500" },
      { name: "TypeORM", Icon: SiNestjs, color: "text-red-300" },
      { name: "Sequelize", Icon: SiNodedotjs, color: "text-blue-300" },
    ],
  },
  {
    title: "API, architecture & messaging",
    headingIcon: SiSwagger,
    headingIconColor: "text-emerald-300",
    glow: "rgba(110, 231, 183, 0.45)",
    items: [
      { name: "REST APIs", Icon: SiSwagger, color: "text-emerald-300" },
      { name: "Microservices", Icon: SiDocker, color: "text-blue-200" },
      { name: "RabbitMQ", Icon: SiRabbitmq, color: "text-orange-300" },
      { name: "BullMQ", Icon: SiNodedotjs, color: "text-amber-200" },
      { name: "Socket.IO", Icon: SiSocketdotio, color: "text-white" },
    ],
  },
  {
    title: "Auth, payments & integrations",
    headingIcon: SiStripe,
    headingIconColor: "text-fuchsia-300",
    glow: "rgba(240, 171, 252, 0.45)",
    items: [
      { name: "JWT / OAuth / RBAC", Icon: SiNestjs, color: "text-red-300" },
      { name: "Stripe", Icon: SiStripe, color: "text-violet-300" },
      { name: "Google APIs", Icon: SiGoogle, color: "text-white/70" },
      { name: "SendGrid", Icon: SiSendgrid, color: "text-sky-300" },
      { name: "OpenAI / MLS", Icon: SiOpenai, color: "text-teal-300" },
    ],
  },
  {
    title: "Tools & DevOps",
    headingIcon: SiDocker,
    headingIconColor: "text-amber-300",
    glow: "rgba(252, 211, 77, 0.45)",
    items: [
      { name: "Git", Icon: SiGit, color: "text-orange-400" },
      { name: "Docker", Icon: SiDocker, color: "text-blue-400" },
      { name: "CI/CD & Jenkins", Icon: SiGit, color: "text-white/70" },
      { name: "AWS", Icon: TbBrandAws, color: "text-amber-200" },
      { name: "Swagger", Icon: SiSwagger, color: "text-lime-300" },
      { name: "New Relic", Icon: SiNewrelic, color: "text-teal-200" },
      { name: "Postman", Icon: SiSwagger, color: "text-orange-200" },
    ],
  },
  {
    title: "Cloud & observability",
    headingIcon: TbBrandAws,
    headingIconColor: "text-cyan-300",
    glow: "rgba(103, 232, 249, 0.45)",
    items: [
      { name: "AWS", Icon: TbBrandAws, color: "text-amber-200" },
      { name: "Docker", Icon: SiDocker, color: "text-blue-400" },
      { name: "Redis", Icon: SiRedis, color: "text-red-500" },
      { name: "New Relic", Icon: SiNewrelic, color: "text-teal-200" },
      { name: "Socket.IO", Icon: SiSocketdotio, color: "text-white" },
    ],
  },
];

type SkillCategory = (typeof categories)[number];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
};

export function Skills() {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const floatingCardRef = useRef<HTMLElement | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
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
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setOriginRect(rect);
    setTargetRect({ top: rect.top, left: rect.left, width: rect.width });
    setExpandedIndex(index);
  };

  const handleCardEnter = (index: number) => {
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      openCard(index);
      hoverTimerRef.current = null;
    }, 500);
  };

  const closeExpandedCard = () => {
    clearHoverTimer();
    setExpandedIndex(null);
    setTargetRect(null);
  };

  useEffect(() => clearHoverTimer, []);

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

  const expandedCategory =
    expandedIndex !== null ? categories[expandedIndex] : null;

  const handleSectionMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (expandedIndex === null) return;
    const popup = floatingCardRef.current;
    if (!popup) return;
    if (!popup.contains(event.target as Node)) {
      closeExpandedCard();
    }
  };

  const renderCardContent = (cat: SkillCategory, showDetails: boolean) => {
    const HeadingIcon = cat.headingIcon as IconType;
    return (
      <>
        <div className="flex items-center gap-3">
          <HeadingIcon
            className={`h-5 w-5 shrink-0 ${cat.headingIconColor}`}
            aria-hidden
          />
          <h3
            className={`text-base font-semibold uppercase tracking-wide ${cat.headingIconColor}`}
          >
            {cat.title}
          </h3>
        </div>
        <ul
          className={`flex flex-wrap transition-all duration-300 ${
            showDetails
              ? "mt-3 max-h-[360px] gap-2.5 opacity-100"
              : "mt-0 max-h-0 gap-0 overflow-hidden opacity-0"
          }`}
        >
          {cat.items.map(({ name, Icon, color }) => (
            <li
              key={name}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80 shadow-[0_0_24px_-12px_rgba(255,255,255,0.2)] transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              <Icon
                className={`h-4 w-4 shrink-0 opacity-90 transition group-hover:scale-110 ${color}`}
                aria-hidden
              />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <section
      id="skills"
      data-snap-section="true"
      className="snap-section relative flex h-full flex-col justify-center bg-[#121212] px-4 py-16 md:px-8"
      onMouseLeave={closeExpandedCard}
      onMouseMove={handleSectionMouseMove}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative mx-auto w-full max-w-7xl ${
          expandedIndex !== null ? "pointer-events-none" : ""
        }`}
      >
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
          Stack
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Skills & tools
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/50">
          Backend engineering with Node.js, NestJS, and TypeScript — scalable
          APIs, data layers, and cloud-ready delivery.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={item}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onMouseEnter={() => handleCardEnter(i)}
              onMouseLeave={clearHoverTimer}
              style={{
                boxShadow: `0 0 34px -20px ${cat.glow}, 0 12px 36px -26px rgba(0,0,0,0.9)`,
              }}
              className={`glass glass-hover rounded-2xl p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ${
                expandedIndex === i ? "invisible" : ""
              }`}
            >
              {renderCardContent(cat, false)}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {expandedCategory && originRect && targetRect && (
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
              className="glass pointer-events-auto fixed z-50 rounded-none border border-white/15 bg-white/[0.07] p-6 will-change-transform md:p-8"
              style={{
                top: originRect.top,
                left: originRect.left,
                width: originRect.width,
                boxShadow: `0 28px 90px -30px ${expandedCategory.glow}, 0 16px 50px -30px rgba(0,0,0,0.92)`,
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
              {renderCardContent(expandedCategory, true)}
            </motion.article>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

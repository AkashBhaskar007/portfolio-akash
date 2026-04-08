"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const roles = [
  {
    company: "Revyrie Global Tech Solutions",
    logo: "/company-logos/revyrie.png",
    glow: "rgba(220, 38, 38, 0.45)",
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
    logo: "/company-logos/accubits.png",
    glow: "rgba(244, 63, 94, 0.45)",
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
  {
    company: "Revolt IT Solutions",
    logo: "/company-logos/revolt.png",
    glow: "rgba(249, 115, 22, 0.45)",
    location: "Trivandrum, Kerala",
    title: "Android App Developer - Freelance",
    period: "Aug 2020 – Aug 2021",
    highlights: [
      "Developed and maintained Android applications using Java and XML.",
      "Collaborated with clients to understand requirements and deliver solutions.",
      "Implemented features such as user authentication, data storage, and network communication.",
      "Optimized app performance and user experience through code optimization and debugging.",
      "Worked on both front-end and back-end development to ensure seamless integration.",
    ],
  },
];

export function Experience() {
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
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 16;
    const scale = 1.08;
    const estimatedExpandedHeight = Math.max(360, rect.height * 1.75);
    const scaledWidth = rect.width * scale;
    const scaledHeight = estimatedExpandedHeight * scale;

    const minLeft = margin + (scaledWidth - rect.width) / 2;
    const maxLeft =
      viewportWidth - margin - rect.width - (scaledWidth - rect.width) / 2;
    const minTop = margin + (scaledHeight - estimatedExpandedHeight) / 2;
    const maxTop =
      viewportHeight -
      margin -
      estimatedExpandedHeight -
      (scaledHeight - estimatedExpandedHeight) / 2;

    const clampedLeft = Math.min(
      Math.max(rect.left, minLeft),
      Math.max(minLeft, maxLeft)
    );
    const preferredTop = rect.top - 96;
    const clampedTop = Math.min(
      Math.max(preferredTop, minTop),
      Math.max(minTop, maxTop)
    );

    setOriginRect(rect);
    setTargetRect({ top: clampedTop, left: clampedLeft, width: rect.width });
    setExpandedIndex(index);
  };

  const handleCardEnter = (index: number) => {
    if (!canHover) return;
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
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (expandedIndex === null) return;

    const handleWheelOrTouch = (event: WheelEvent | TouchEvent) => {
      const popup = floatingCardRef.current;
      if (popup && event.target instanceof Node && popup.contains(event.target)) {
        return;
      }
      closeExpandedCard();
    };
    const handleScroll = () => closeExpandedCard();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeExpandedCard();
    };
    const snapContainer = document.querySelector<HTMLElement>(".snap-container");

    window.addEventListener("wheel", handleWheelOrTouch, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleWheelOrTouch, {
      passive: true,
    });
    snapContainer?.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("wheel", handleWheelOrTouch);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleWheelOrTouch);
      snapContainer?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [expandedIndex]);

  const expandedRole = expandedIndex !== null ? roles[expandedIndex] : null;

  const handleSectionMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (expandedIndex === null) return;
    const popup = floatingCardRef.current;
    if (!popup) return;
    if (!popup.contains(event.target as Node)) {
      closeExpandedCard();
    }
  };

  const renderCardContent = (
    job: (typeof roles)[number],
    showDetails: boolean,
  ) => (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white md:text-xl">
            {job.title}
          </h3>
          <p className="mt-1 text-sm text-white/80">{job.company}</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/45 md:text-sm">
            <MapPin className="h-3.5 w-3.5" />
            {job.location} · {job.period}
          </p>
        </div>
        <div className="mt-2 h-12 w-12 shrink-0 overflow-hidden md:mt-0 md:h-14 md:w-14">
          <Image
            src={job.logo}
            alt={`${job.company} logo`}
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <ul
        className={`text-[11px] leading-relaxed text-white/60 md:text-xs ${
          showDetails
            ? "mt-4 space-y-2.5 opacity-100"
            : "mt-0 max-h-0 space-y-2.5 overflow-hidden opacity-0"
        }`}
      >
        {job.highlights.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/35" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <section
      id="experience"
      data-snap-section="true"
      className="snap-section relative flex h-full flex-col justify-center bg-[#121212] px-4 py-16 md:px-8"
      onMouseLeave={canHover ? closeExpandedCard : undefined}
      onMouseMove={canHover ? handleSectionMouseMove : undefined}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(59,130,246,0.08),transparent)]" />

      <div
        className={`relative mx-auto w-full max-w-5xl ${
          canHover && expandedIndex !== null ? "pointer-events-none" : ""
        }`}
      >
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
          <div className="absolute left-[11px] top-2 -bottom-8 w-px bg-gradient-to-b from-white/25 via-white/10 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <ul className="space-y-12">
            {roles.map((job, i) => (
              <motion.li
                key={job.company}
                initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-10 md:grid md:grid-cols-2 md:pl-0"
              >
                <span className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5 shadow-[0_0_20px_-4px_rgba(255,255,255,0.35)] md:left-1/2 md:top-3 md:h-8 md:w-8 md:-translate-x-1/2">
                  <Briefcase className="h-3 w-3 text-white/70 md:h-3.5 md:w-3.5" />
                </span>

                <article
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onMouseEnter={canHover ? () => handleCardEnter(i) : undefined}
                  onMouseLeave={canHover ? clearHoverTimer : undefined}
                  style={{
                    boxShadow: `0 0 34px -20px ${job.glow}, 0 12px 36px -26px rgba(0,0,0,0.9)`,
                  }}
                  className={`group glass glass-hover rounded-2xl p-5 md:p-6 ${
                    i % 2 === 0
                      ? "md:col-start-1 md:mr-10"
                      : "md:col-start-2 md:ml-10"
                  } ${i === 2 ? "md:-mt-8" : ""} ${
                    expandedIndex === i ? "invisible" : ""
                  }`}
                >
                  {renderCardContent(job, !canHover)}
                </article>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {canHover && expandedRole && originRect && targetRect && (
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
              className="glass pointer-events-auto fixed z-50 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border border-white/15 bg-white/[0.07] p-5 will-change-transform md:p-6"
              style={{
                top: originRect.top,
                left: originRect.left,
                width: originRect.width,
                boxShadow: `0 28px 90px -26px ${expandedRole.glow}, 0 16px 50px -30px rgba(0,0,0,0.92)`,
              }}
              initial={{
                top: originRect.top,
                left: originRect.left,
                width: originRect.width,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                top: targetRect.top,
                left: targetRect.left,
                width: targetRect.width,
                scale: 1.08,
                opacity: 1,
              }}
              exit={{
                scale: 1.02,
                opacity: 0,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseLeave={closeExpandedCard}
            >
              {renderCardContent(expandedRole, true)}
            </motion.article>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

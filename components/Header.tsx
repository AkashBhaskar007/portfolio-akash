"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Download } from "lucide-react";

const nav = [
  {
    href: "#home",
    label: "Home",
    activeTextClass: "text-sky-300",
    activeGlowClass: "[text-shadow:0_0_14px_rgba(125,211,252,0.7)]",
    activeMobileClass: "bg-sky-500/20 text-sky-200",
    activeMobileGlowClass: "shadow-[0_0_22px_-8px_rgba(56,189,248,0.9)]",
  },
  {
    href: "#skills",
    label: "Skills",
    activeTextClass: "text-violet-300",
    activeGlowClass: "[text-shadow:0_0_14px_rgba(196,181,253,0.75)]",
    activeMobileClass: "bg-violet-500/20 text-violet-200",
    activeMobileGlowClass: "shadow-[0_0_22px_-8px_rgba(139,92,246,0.9)]",
  },
  {
    href: "#experience",
    label: "Experience",
    activeTextClass: "text-emerald-300",
    activeGlowClass: "[text-shadow:0_0_14px_rgba(110,231,183,0.75)]",
    activeMobileClass: "bg-emerald-500/20 text-emerald-200",
    activeMobileGlowClass: "shadow-[0_0_22px_-8px_rgba(16,185,129,0.9)]",
  },
  {
    href: "#education",
    label: "Education",
    activeTextClass: "text-fuchsia-300",
    activeGlowClass: "[text-shadow:0_0_14px_rgba(240,171,252,0.75)]",
    activeMobileClass: "bg-fuchsia-500/20 text-fuchsia-200",
    activeMobileGlowClass: "shadow-[0_0_22px_-8px_rgba(217,70,239,0.9)]",
  },
  {
    href: "#contact",
    label: "Contact",
    activeTextClass: "text-rose-300",
    activeGlowClass: "[text-shadow:0_0_14px_rgba(253,164,175,0.75)]",
    activeMobileClass: "bg-rose-500/20 text-rose-200",
    activeMobileGlowClass: "shadow-[0_0_22px_-8px_rgba(244,63,94,0.9)]",
  },
];

type HeaderProps = {
  activeSection?: string;
};

export function Header({ activeSection = "#home" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const showProfileIcon = [
    "#skills",
    "#experience",
    "#education",
    "#contact",
  ].includes(activeSection);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/10 bg-[#121212]/70 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-16 md:px-8">
        <Link
          href="#home"
          className={`group flex items-center gap-2 rounded-full text-sm font-medium tracking-tight text-white/90 transition hover:text-white ${
            showProfileIcon
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!showProfileIcon}
          tabIndex={!showProfileIcon ? -1 : 0}
        >
          <span className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20 transition group-hover:border-white/35">
            <Image
              src="/akash-profile.webp"
              alt="Akash Bhaskar"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition ${
                activeSection === item.href
                  ? `font-semibold ${item.activeTextClass} ${item.activeGlowClass}`
                  : "text-white/55 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/AkashBhaskar_Resume.pdf"
            download="AkashBhaskar_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-rose-300/40 bg-rose-400/10 px-3 py-1.5 text-sm font-medium text-rose-200 transition duration-300 hover:-translate-y-0.5 hover:border-rose-200/70 hover:bg-rose-400/20 hover:text-rose-100 hover:shadow-[0_0_28px_-8px_rgba(251,113,133,0.9)]"
            aria-label="Download resume PDF"
            title="Download resume"
          >
            <Download className="h-4 w-4 motion-safe:animate-bounce" />
            <span>Resume</span>
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/80 md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#121212]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    activeSection === item.href
                      ? `${item.activeMobileClass} ${item.activeMobileGlowClass} font-medium`
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="/AkashBhaskar_Resume.pdf"
                download="AkashBhaskar_Resume.pdf"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-rose-300/40 bg-rose-400/10 px-3 py-2 text-sm font-medium text-rose-200 transition duration-300 hover:border-rose-200/70 hover:bg-rose-400/20 hover:text-rose-100 hover:shadow-[0_0_28px_-10px_rgba(251,113,133,0.85)]"
                onClick={() => setOpen(false)}
                aria-label="Download resume PDF"
                title="Download resume"
              >
                <Download className="h-4 w-4 motion-safe:animate-bounce" />
                <span>Resume</span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

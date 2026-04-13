"use client";

import Link from "next/link";

const links = [
  { href: "https://github.com", label: "GitHub", external: true },
  {
    href: "https://www.linkedin.com/in/bhaskarakash",
    label: "LinkedIn",
    external: true,
  },
  { href: "mailto:i.am.akashbhaskar@gmail.com", label: "Email", external: true },
];

export function Footer() {
  return (
    <footer
      id="contact"
      data-snap-section="true"
      className="snap-section border-t border-white/10 bg-[#121212] px-4 py-16 md:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-300/80 [text-shadow:0_0_10px_rgba(253,164,175,0.55)]">
            Contact
          </p>
          <p className="mt-2 text-sm font-medium text-rose-200 [text-shadow:0_0_16px_rgba(253,164,175,0.6)]">
            Akash Bhaskar
          </p>
          <p className="mt-1 text-sm text-white/45">
            Trivandrum, Kerala · i.am.akashbhaskar@gmail.com
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              {...(l.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-sm text-white/55 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl text-center text-xs text-white/30 md:text-left">
        © {new Date().getFullYear()} Akash Bhaskar. All rights reserved.
      </p>
    </footer>
  );
}

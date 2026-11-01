"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.7 })
        .from(
          ".hero-line",
          { yPercent: 120, opacity: 0, duration: 1, stagger: 0.12 },
          "-=0.3"
        )
        .from(".hero-desc", { y: 24, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.3");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative mx-auto flex min-h-[88vh] w-full max-w-shell flex-col justify-center px-4 pb-16 pt-28 sm:px-6"
    >
      {/* subtle CSS-only ambient glow — not an image */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #A855F7 0%, transparent 70%)" }}
      />

      <p className="hero-eyebrow mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
        A typography gallery of feelings
      </p>

      <h1 className="font-body text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-7xl md:text-8xl">
        <span className="block overflow-hidden">
          <span className="hero-line inline-block">Words that <span className="text-accent">feel</span>.</span>
        </span>
        <span className="block overflow-hidden">
          <span className="hero-line inline-block">Thoughts that <span className="text-accent">stay</span>.</span>
        </span>
      </h1>

      <p className="hero-desc mt-8 max-w-xl text-lg text-ink-muted sm:text-xl">
        A collection of powerful quotes, meaningful thoughts and timeless
        Shayaris for every mood and moment.
      </p>

      <a
        href="#collection"
        className="hero-scroll group mt-16 inline-flex w-fit items-center gap-3 text-sm font-medium text-ink-muted transition-colors hover:text-white"
      >
        <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-accent" />
        </span>
        <span className="flex items-center gap-1">
          Explore the collection
          <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" />
        </span>
      </a>
    </section>
  );
}

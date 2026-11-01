"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Keyword-rich internal-link cloud. Real on-page content + crawlable anchor
// text is what actually moves SEO (meta keywords barely matter), and the links
// deep-link into filtered views via ?type / ?category / ?q (read by QuoteGrid).
const q = (params) => `/quotes?${new URLSearchParams(params).toString()}`;

const TOPICS = [
  { label: "Best Quotes", href: "/quotes" },
  { label: "Inspirational Quotes", href: "/quotes" },
  { label: "Motivational Quotes", href: q({ category: "Motivation" }) },
  { label: "Life Quotes", href: q({ category: "Life" }) },
  { label: "Self Love Quotes", href: q({ category: "Self Love" }) },
  { label: "Positive Thoughts", href: q({ category: "Positivity" }) },
  { label: "Spiritual Thoughts", href: q({ category: "Spiritual" }) },
  { label: "Deep Meaningful Quotes", href: "/quotes" },
  { label: "Short Quotes", href: "/quotes" },
  { label: "Famous Quotes", href: "/quotes" },
  { label: "Heart Touching Quotes", href: "/quotes" },
  { label: "Thought of the Day", href: "/quotes" },
  { label: "Beautiful Quotes", href: "/quotes" },
  { label: "Quotes for Success", href: q({ q: "success" }) },
  { label: "Good Morning Thoughts", href: q({ category: "Positivity" }) },
  { label: "Resilience Quotes", href: q({ category: "Resilience" }) },
  { label: "Patience Quotes", href: q({ category: "Patience" }) },
  { label: "Hindi Shayari", href: "/shayari" },
  { label: "Two Line Shayari", href: "/shayari" },
  { label: "Attitude Shayari", href: "/shayari" },
  { label: "Sad Shayari", href: "/shayari" },
  { label: "Love Shayari", href: "/shayari" },
];

const cloud = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};
const chip = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function TopicLinks() {
  const headRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !headRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      });
    }, headRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="mx-auto w-full max-w-shell px-4 py-16 sm:px-6 md:py-24">
      <div ref={headRef} className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Explore by topic
        </p>
        <h2 className="font-body text-3xl font-extrabold tracking-tight sm:text-4xl">
          Quotes &amp; Shayari for every mood and moment
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          From the best quotes about life in English to heart touching{" "}
          <Link href="/shayari" className="text-ink underline-offset-4 hover:text-accent hover:underline">
            Hindi Shayari
          </Link>
          , DarshTalks brings together motivational quotes, love quotes, deep
          meaningful thoughts, two line Shayari, attitude Shayari and positive
          thoughts for daily life. Browse famous quotes and short quotes for your
          Instagram bio, find a thought of the day, or read inspirational quotes
          for students and the best motivational quotes for success — every line
          styled as its own typography card you can{" "}
          <Link href="/quotes" className="text-ink underline-offset-4 hover:text-accent hover:underline">
            share or download
          </Link>
          .
        </p>
      </div>

      <motion.ul
        variants={cloud}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-10 flex flex-wrap gap-2.5"
      >
        {TOPICS.map((t) => (
          <motion.li key={t.label} variants={chip} whileHover={{ y: -3 }}>
            <Link
              href={t.href}
              className="inline-flex rounded-full border border-white/10 bg-base-soft px-4 py-2 text-sm font-medium text-ink-muted transition-colors duration-300 hover:border-accent hover:text-white"
            >
              {t.label}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

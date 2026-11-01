"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SearchX } from "lucide-react";

import allQuotes from "@/data/quotes.json";
import templatesData from "@/data/templates.json";
import { useQuotes } from "@/hooks/useQuotes";
import { useQuoteTemplates } from "@/hooks/useQuoteTemplates";
import QuoteCard from "@/components/quotes/QuoteCard";
import QuoteFilters from "@/components/sections/QuoteFilters";
import Button from "@/components/ui/Button";

const PAGE_SIZE = 12;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

export default function QuoteGrid({
  title = "The Collection",
  subtitle = "Every card a different voice. Scroll, search, shuffle.",
  initialType = "all",
  showTypeToggle = true,
  baseSeed = "darshtalks",
  restrictType = null,
}) {
  const headerRef = useRef(null);

  // The full dataset lives in a client chunk (code-split) rather than being
  // serialized into the server payload. `restrictType` narrows it up front
  // (e.g. the Shayari page), which also scopes the category list.
  const quotes = useMemo(
    () => (restrictType ? allQuotes.filter((q) => q.type === restrictType) : allQuotes),
    [restrictType]
  );

  const {
    type,
    setType,
    category,
    setCategory,
    search,
    setSearch,
    categories,
    filtered,
    isFiltering,
    reset,
  } = useQuotes(quotes, { initialType });

  const { items, shuffle } = useQuoteTemplates(filtered, templatesData, { baseSeed });

  const [visible, setVisible] = useState(PAGE_SIZE);

  // Apply any filters passed via URL query (?type=&category=&q=) once on mount,
  // so keyword topic links deep-link into a filtered view. Read from
  // window.location (not useSearchParams) to keep the page statically rendered.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const t = params.get("type");
    const c = params.get("category");
    const q = params.get("q");
    if (!restrictType && t && ["all", "quote", "shayari"].includes(t)) setType(t);
    if (c) setCategory(c);
    if (q) setSearch(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset pagination whenever the result set changes.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [type, category, search]);

  // GSAP ScrollTrigger reveal for the section header (text only — the cards
  // are owned by Framer Motion, so the two libraries never fight over the
  // same transforms).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !headerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  return (
    <section id="collection" className="mx-auto w-full max-w-shell px-4 py-16 sm:px-6 md:py-24">
      <div ref={headerRef} className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          DarshTalks
        </p>
        <h2 className="font-body text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-ink-muted">{subtitle}</p>
      </div>

      <div className="mb-10">
        <QuoteFilters
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          categories={categories}
          onShuffle={shuffle}
          showTypeToggle={showTypeToggle}
          resultCount={items.length}
        />
      </div>

      {shown.length === 0 ? (
        <EmptyState onReset={reset} isFiltering={isFiltering} />
      ) : (
        <motion.div
          layout
          variants={container}
          initial="hidden"
          animate="show"
          className="masonry"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {hasMore && (
        <div className="mt-14 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="px-8 py-3"
          >
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}

function EmptyState({ onReset, isFiltering }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-base-soft px-6 py-20 text-center">
      <SearchX size={40} className="mb-4 text-ink-muted" />
      <h3 className="text-xl font-semibold">Nothing here yet</h3>
      <p className="mt-2 max-w-sm text-ink-muted">
        We couldn&apos;t find any quotes matching your filters. Try a different
        search or category.
      </p>
      {isFiltering && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9333ea]"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

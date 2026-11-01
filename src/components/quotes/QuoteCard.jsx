"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getCardStyle, getTextStyle } from "@/lib/templateUtils";
import QuoteCardActions from "./QuoteCardActions";

// Run the row-span measurement before paint on the client (no flash of
// collapsed cards), while safely falling back to useEffect during SSR.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Maps a template's decorativeStyle to the CSS classes defined in globals.css.
const DECO_CLASS = {
  "corner-dot": "deco-corner-dot",
  underline: "deco-underline",
  "bar-left": "deco-bar-left",
  "quote-mark": "deco-quote-mark",
  "big-quote": "deco-big-quote",
  "dots-grid": "deco-dots-grid",
  frame: "deco-frame",
  ring: "deco-ring",
  slash: "deco-slash",
  "double-line": "deco-double-line",
  none: "",
};

const enter = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function QuoteCard({ quote }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const template = quote.template;

  // Two jobs, run before paint:
  //   1. fit() shrinks the quote font until it fits the card width, so no word
  //      ever wraps mid-word or overflows (the card itself grows taller to show
  //      the whole quote — nothing is clipped).
  //   2. measure() turns the card's final height into a grid row span so the
  //      masonry packs without gaps.
  // Font changes never alter the card's WIDTH, so re-running can't loop.
  useIsoLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const textEl = content?.querySelector(".quote-text");
    if (!wrapper || !content || !textEl) return;

    const remToPx = (v) => {
      const n = parseFloat(v);
      return Number.isNaN(n) ? null : n * 16;
    };

    const fit = () => {
      const isMobile = window.innerWidth < 768;
      const maxFs =
        remToPx(isMobile ? template.mobileFontSize : template.fontSize) || 24;
      const minFs = 12;
      let fs = maxFs;
      textEl.style.fontSize = `${fs}px`;
      let guard = 0;
      // Shrink while a word is wider than the available text column.
      while (fs > minFs && textEl.scrollWidth > textEl.clientWidth + 1 && guard++ < 80) {
        fs = Math.max(minFs, fs - 1);
        textEl.style.fontSize = `${fs}px`;
      }
    };

    const measure = () => {
      const grid = wrapper.parentElement;
      if (!grid) return;
      const gridStyles = getComputedStyle(grid);
      const row = parseFloat(gridStyles.getPropertyValue("--masonry-row")) || 8;
      const gap = parseFloat(gridStyles.rowGap) || 20;
      const h = content.getBoundingClientRect().height;
      const span = Math.max(1, Math.ceil((h + gap) / (row + gap)));
      wrapper.style.gridRowEnd = `span ${span}`;
    };

    const run = () => {
      fit();
      measure();
    };

    run();

    let lastWidth = content.clientWidth;
    const ro = new ResizeObserver(() => {
      const w = content.clientWidth;
      if (Math.abs(w - lastWidth) > 0.5) {
        lastWidth = w;
        run(); // width changed (resize / relayout) -> refit + remeasure
      } else {
        measure(); // height-only change (e.g. our own fit) -> just repack
      }
    });
    ro.observe(content);

    // Fonts reflow text once loaded — refit and repack then.
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(run).catch(() => {});
    }

    return () => ro.disconnect();
  }, [template, quote.text]);

  if (!template) return null;

  const decoClass = DECO_CLASS[template.decorativeStyle] ?? "";
  const isWide = (template.gridSpan || 1) >= 2;
  const showAuthor = quote.author && quote.author !== "Unknown";

  return (
    <motion.article
      ref={wrapperRef}
      layout
      variants={enter}
      className={isWide ? "masonry-item col-wide" : "masonry-item"}
      transition={{ layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
    >
      <motion.div
        ref={contentRef}
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={`deco flex w-full flex-col shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] ${decoClass}`}
        style={getCardStyle(template)}
      >
        {(quote.category || quote.type) && (
          <span className="mb-3 inline-block w-fit rounded-full bg-black/10 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] opacity-70">
            {quote.category || quote.type}
          </span>
        )}

        <p className="quote-text" style={getTextStyle(template)}>
          {quote.text}
        </p>

        {showAuthor && (
          <p className="mt-3 text-sm font-semibold italic opacity-75">
            — {quote.author}
          </p>
        )}

        <QuoteCardActions quote={quote} template={template} cardRef={contentRef} />
      </motion.div>
    </motion.article>
  );
}

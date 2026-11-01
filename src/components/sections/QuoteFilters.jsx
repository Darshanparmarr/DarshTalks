"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import ShuffleButton from "@/components/quotes/ShuffleButton";

const TYPE_TABS = [
  { key: "all", label: "All" },
  { key: "quote", label: "Quotes" },
  { key: "shayari", label: "Shayari" },
];

export default function QuoteFilters({
  type,
  setType,
  category,
  setCategory,
  search,
  setSearch,
  categories,
  onShuffle,
  showTypeToggle = true,
  resultCount,
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Top row: type toggle + search + shuffle */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {showTypeToggle ? (
          <div className="relative flex w-fit rounded-full border border-white/10 bg-base-soft p-1">
            {TYPE_TABS.map((tab) => {
              const active = type === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setType(tab.key)}
                  className="relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300"
                  style={{ color: active ? "#fff" : "#A1A1AA" }}
                >
                  {active && (
                    <motion.span
                      layoutId="type-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          <div className="relative flex-1 lg:w-80">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search quotes, authors, moods…"
              aria-label="Search quotes"
              className="w-full rounded-full border border-white/10 bg-base-soft py-3 pl-11 pr-10 text-sm text-ink placeholder:text-ink-muted/70 transition-colors duration-300 focus:border-accent focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-muted transition-colors hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {onShuffle && <ShuffleButton onShuffle={onShuffle} />}
        </div>
      </div>

      {/* Category chips */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {categories.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                active
                  ? "border-accent bg-accent/15 text-white"
                  : "border-white/10 text-ink-muted hover:border-white/25 hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {typeof resultCount === "number" && (
        <p className="text-sm text-ink-muted">
          {resultCount} {resultCount === 1 ? "piece" : "pieces"}
        </p>
      )}
    </div>
  );
}

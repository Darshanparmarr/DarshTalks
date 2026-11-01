// Quote data helpers: filtering, searching, categories, formatting.
// All pure functions — no React, no side effects.

// Unique, sorted category list with an "All" entry prepended.
export function getCategories(quotes) {
  const set = new Set();
  quotes.forEach((q) => q.category && set.add(q.category));
  return ["All", ...Array.from(set).sort()];
}

// Filter by type ("quote" | "shayari" | "all"), category, and free-text search.
// Search matches quote text, author, language, and category (case-insensitive).
export function filterQuotes(quotes, { type = "all", category = "All", search = "" } = {}) {
  const q = search.trim().toLowerCase();

  return quotes.filter((item) => {
    if (type !== "all" && item.type !== type) return false;
    if (category !== "All" && item.category !== category) return false;

    if (q) {
      const haystack = [item.text, item.author, item.language, item.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

// Plain-text representation used for copy + share.
export function formatQuoteForShare(quote) {
  const author = quote.author && quote.author !== "Unknown" ? `\n\n— ${quote.author}` : "";
  return `${quote.text}${author}\n\nvia DarshTalks`;
}

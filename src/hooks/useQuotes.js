"use client";

import { useMemo, useState } from "react";
import { filterQuotes, getCategories } from "@/lib/quoteUtils";

// Manages quote filtering state: content type, category, and search text.
// `type` accepts "all" | "quote" | "shayari".
export function useQuotes(allQuotes, { initialType = "all" } = {}) {
  const [type, setType] = useState(initialType);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = useMemo(() => getCategories(allQuotes), [allQuotes]);

  const filtered = useMemo(
    () => filterQuotes(allQuotes, { type, category, search }),
    [allQuotes, type, category, search]
  );

  const reset = () => {
    setCategory("All");
    setSearch("");
  };

  return {
    type,
    setType,
    category,
    setCategory,
    search,
    setSearch,
    categories,
    filtered,
    reset,
    isFiltering: category !== "All" || search.trim().length > 0,
  };
}

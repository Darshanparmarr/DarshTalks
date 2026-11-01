"use client";

import { useCallback, useMemo, useState } from "react";
import { assignTemplates } from "@/lib/templateUtils";
import { seededShuffle } from "@/lib/randomUtils";

// Assigns templates to quotes and powers the Shuffle interaction.
//
// Hydration safety: the first render (shuffleCount === 0) uses a FIXED seed and
// the original quote order, so server and client produce identical markup.
// Only an explicit shuffle() changes the seed/order.
export function useQuoteTemplates(quotes, templates, { baseSeed = "darshtalks" } = {}) {
  const [shuffleCount, setShuffleCount] = useState(0);

  const seed = `${baseSeed}::${shuffleCount}`;

  const assigned = useMemo(
    () => assignTemplates(quotes, templates, seed),
    [quotes, templates, seed]
  );

  // Keep original order on first paint; reorder only after a shuffle.
  const items = useMemo(() => {
    if (shuffleCount === 0) return assigned;
    return seededShuffle(assigned, `${seed}::order`);
  }, [assigned, seed, shuffleCount]);

  const shuffle = useCallback(() => setShuffleCount((c) => c + 1), []);

  return { items, shuffle, isShuffled: shuffleCount > 0, seed };
}

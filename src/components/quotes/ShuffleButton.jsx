"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";

// Delightful shuffle button: the icon does a single 180° spin per click while
// the label stays put. Purely cosmetic — the actual reshuffle is driven by the
// onShuffle callback.
export default function ShuffleButton({ onShuffle }) {
  const [spins, setSpins] = useState(0);

  const handleClick = () => {
    setSpins((s) => s + 1);
    onShuffle?.();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      aria-label="Shuffle the layout"
      className="group inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-10px_rgba(168,85,247,0.8)] transition-colors duration-300 hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
    >
      <motion.span
        animate={{ rotate: spins * 180 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="text-accent"
      >
        <Shuffle size={18} />
      </motion.span>
      Shuffle
    </motion.button>
  );
}

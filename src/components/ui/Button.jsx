"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Small, reusable button with Framer Motion press/hover feedback.
// `as` accepts an intrinsic tag string ("button", "a") or a React component
// (e.g. next/link's Link). variant: "solid" | "outline" | "ghost"
export default function Button({
  children,
  variant = "solid",
  className = "",
  as = "button",
  ...props
}) {
  const Comp = useMemo(() => {
    if (typeof as === "string") return motion[as] || motion.button;
    // motion.create (v11+) wraps a custom component like next/link's Link.
    return typeof motion.create === "function" ? motion.create(as) : motion(as);
  }, [as]);

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-colors duration-300 ease-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    solid: "bg-accent text-white hover:bg-[#9333ea]",
    outline: "border border-white/15 text-ink hover:border-accent hover:text-white",
    ghost: "text-ink-muted hover:text-white hover:bg-white/5",
  };

  return (
    <Comp
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}

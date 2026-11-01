// Centralized font configuration for Darshtalks.
// All Google Fonts are loaded once here via next/font for optimization and
// zero layout shift. Each font exposes a CSS variable that templates reference
// through `lib/templateUtils.js`. Custom/local fonts are declared in
// `src/styles/fonts.css` with graceful fallbacks (see note at bottom).

import {
  Shrikhand,
  Oi,
  Bowlby_One_SC,
  Chonburi,
  Modak,
  Coiny,
  Lilita_One,
  Bungee,
  Sigmar,
  Titan_One,
  Alfa_Slab_One,
  Righteous,
  Unbounded,
  Bricolage_Grotesque,
  Passion_One,
} from "next/font/google";

// --- 15 Google Fonts -------------------------------------------------------

export const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shrikhand",
});

export const oi = Oi({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oi",
});

export const bowlby = Bowlby_One_SC({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bowlby",
});

export const chonburi = Chonburi({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chonburi",
});

export const modak = Modak({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-modak",
});

export const coiny = Coiny({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-coiny",
});

export const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lilita",
});

export const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bungee",
});

export const sigmar = Sigmar({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sigmar",
});

export const titan = Titan_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-titan",
});

export const alfa = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alfa",
});

export const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-righteous",
});

export const unbounded = Unbounded({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-unbounded",
});

export const bricolage = Bricolage_Grotesque({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

export const passion = Passion_One({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-passion",
});

// All Google font CSS-variable classNames combined. Apply on <html>/<body>
// so every variable is available app-wide.
export const fontVariables = [
  shrikhand.variable,
  oi.variable,
  bowlby.variable,
  chonburi.variable,
  modak.variable,
  coiny.variable,
  lilita.variable,
  bungee.variable,
  sigmar.variable,
  titan.variable,
  alfa.variable,
  righteous.variable,
  unbounded.variable,
  bricolage.variable,
  passion.variable,
].join(" ");

// Maps a template `fontFamily` key -> the CSS value used in inline styles.
// Google fonts resolve to their next/font CSS variable. The 6 custom fonts
// resolve to the family names declared via @font-face in styles/fonts.css;
// if the font files are not present the browser falls back to the stack.
export const FONT_STACK = {
  shrikhand: "var(--font-shrikhand), cursive",
  oi: "var(--font-oi), serif",
  bowlby: "var(--font-bowlby), sans-serif",
  chonburi: "var(--font-chonburi), serif",
  modak: "var(--font-modak), cursive",
  coiny: "var(--font-coiny), cursive",
  lilita: "var(--font-lilita), sans-serif",
  bungee: "var(--font-bungee), sans-serif",
  sigmar: "var(--font-sigmar), sans-serif",
  titan: "var(--font-titan), sans-serif",
  alfa: "var(--font-alfa), serif",
  righteous: "var(--font-righteous), sans-serif",
  unbounded: "var(--font-unbounded), sans-serif",
  bricolage: "var(--font-bricolage), sans-serif",
  passion: "var(--font-passion), sans-serif",

  // Optional custom/local fonts. Family names must match @font-face in fonts.css.
  sugra: "'Sugra', var(--font-shrikhand), cursive",
  quinia: "'Quinia', var(--font-chonburi), serif",
  ritteru: "'Ritteru', var(--font-bungee), sans-serif",
  jubble: "'Jubble', var(--font-coiny), cursive",
  etrixo: "'Etrixo', var(--font-righteous), sans-serif",
  lancelot: "'Lancelot', var(--font-alfa), serif",
};

// Resolve a font key to a usable CSS font-family string.
export function resolveFont(key) {
  return FONT_STACK[key] || FONT_STACK.bricolage;
}

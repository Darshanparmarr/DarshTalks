// Template assignment + style resolution.
// Assignment is deterministic (seeded) so it is hydration-safe, and it avoids
// consecutive repeats of the same template / same background color.

import { createRng, randInt } from "@/lib/randomUtils";
import { resolveFont } from "@/config/fonts";

// Assign a template to every quote. Returns an array of
// { ...quote, template } in the SAME order as the input quotes.
//
// - `quotes`   : array of quote objects (must have stable `id`)
// - `templates`: array of template objects
// - `seed`     : any string/number; same seed => same assignment
export function assignTemplates(quotes, templates, seed = "default") {
  if (!templates.length) return quotes.map((q) => ({ ...q, template: null }));

  const rng = createRng(`tpl::${seed}`);
  const result = [];
  let prevTemplateId = null;
  let prevBg = null;

  for (let i = 0; i < quotes.length; i++) {
    let chosen = null;

    // Try a handful of draws to dodge repeats; fall back to any pick.
    for (let attempt = 0; attempt < 8; attempt++) {
      const candidate = templates[randInt(rng, templates.length)];
      const sameTemplate = candidate.id === prevTemplateId;
      const sameColor = candidate.backgroundColor === prevBg;
      if (!sameTemplate && !sameColor) {
        chosen = candidate;
        break;
      }
      if (!sameTemplate && !chosen) chosen = candidate; // acceptable fallback
    }

    if (!chosen) chosen = templates[randInt(rng, templates.length)];

    prevTemplateId = chosen.id;
    prevBg = chosen.backgroundColor;
    result.push({ ...quotes[i], template: chosen });
  }

  return result;
}

// Convert a template into an inline style object for the card shell.
export function getCardStyle(template) {
  if (!template) return {};
  return {
    backgroundColor: template.backgroundColor,
    color: template.textColor,
    borderRadius: template.borderRadius,
    padding: template.padding,
    aspectRatio: template.aspectRatio,
    textAlign: template.textAlignment,
  };
}

// Inline style for the quote text itself (font identity lives here).
export function getTextStyle(template) {
  if (!template) return {};
  return {
    fontFamily: resolveFont(template.fontFamily),
    fontWeight: template.fontWeight,
    letterSpacing: template.letterSpacing,
    lineHeight: template.lineHeight,
    // Responsive size handled via CSS vars + media query in globals.css.
    "--fs": template.fontSize,
    "--fs-m": template.mobileFontSize,
  };
}

// How many grid columns a card should span (clamped for small screens).
export function getColumnSpan(template, maxCols) {
  const span = template?.gridSpan || 1;
  return Math.min(span, Math.max(1, maxCols));
}

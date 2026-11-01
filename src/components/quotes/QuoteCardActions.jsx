"use client";

import { useState } from "react";
import { Share2, Download, Check, Loader2 } from "lucide-react";
import {
  buildShareText,
  renderQuoteImage,
  downloadBlob,
  slugify,
} from "@/lib/shareUtils";

// Subtle Share + Download actions. The Darshtalks tag is baked into the
// exported image / shared text only — never shown on the card itself.
// `cardRef` points at the colored card so we can read its resolved font.
export default function QuoteCardActions({ quote, template, cardRef }) {
  const [busy, setBusy] = useState(null); // "share" | "download" | null
  const [done, setDone] = useState(null); // "share" | "download" | null

  const resolveFontFamily = () => {
    const el = cardRef?.current?.querySelector(".quote-text");
    return el ? getComputedStyle(el).fontFamily : undefined;
  };

  const flashDone = (key) => {
    setDone(key);
    setTimeout(() => setDone((d) => (d === key ? null : d)), 1600);
  };

  const handleShare = async () => {
    if (busy) return;
    setBusy("share");
    try {
      const fontFamily = resolveFontFamily();
      const blob = await renderQuoteImage(quote, template, fontFamily);
      const file =
        blob && typeof File !== "undefined"
          ? new File([blob], `${slugify(quote.text)}-darshtalks.png`, {
              type: "image/png",
            })
          : null;

      // Prefer sharing the branded image; fall back to text; then to download.
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: buildShareText(quote) });
      } else if (navigator.share) {
        await navigator.share({ title: "DarshTalks", text: buildShareText(quote) });
      } else if (blob) {
        downloadBlob(blob, `${slugify(quote.text)}-darshtalks.png`);
        flashDone("share");
      }
    } catch {
      // user cancelled the share sheet, or something failed — stay quiet
    } finally {
      setBusy(null);
    }
  };

  const handleDownload = async () => {
    if (busy) return;
    setBusy("download");
    try {
      const fontFamily = resolveFontFamily();
      const blob = await renderQuoteImage(quote, template, fontFamily);
      if (blob) {
        downloadBlob(blob, `${slugify(quote.text)}-darshtalks.png`);
        flashDone("download");
      }
    } catch {
      /* no-op */
    } finally {
      setBusy(null);
    }
  };

  const btn =
    "inline-flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition-opacity duration-300 opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-current disabled:opacity-50";

  return (
    <div className="mt-auto flex items-center gap-1.5 pt-4">
      <button
        type="button"
        onClick={handleShare}
        disabled={busy === "download"}
        aria-label="Share quote as an image"
        className={btn}
      >
        {busy === "share" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : done === "share" ? (
          <Check size={14} />
        ) : (
          <Share2 size={14} />
        )}
        <span>Share</span>
      </button>

      <button
        type="button"
        onClick={handleDownload}
        disabled={busy === "share"}
        aria-label="Download quote as an image"
        className={btn}
      >
        {busy === "download" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : done === "download" ? (
          <Check size={14} />
        ) : (
          <Download size={14} />
        )}
        <span>Download</span>
      </button>
    </div>
  );
}

// Sharing + downloading a quote as a branded image.
// The "Darshtalks" tag is rendered ONLY into the exported image / shared text,
// never shown on the card UI itself.

const BRAND = "DarshTalks";
const BRAND_URL = "darshanparmardev.vercel.app";

// Plain-text payload for Web Share / clipboard fallback — carries the tag.
export function buildShareText(quote) {
  const author =
    quote.author && quote.author !== "Unknown" ? `\n— ${quote.author}` : "";
  return `“${quote.text}”${author}\n\nvia ${BRAND} · ${BRAND_URL}`;
}

// Render a portrait quote card (1080x1350) to a canvas and return a PNG Blob.
// `fontFamily` should be the resolved CSS font-family string read from the DOM
// so the image matches the card's typography.
export async function renderQuoteImage(quote, template, fontFamily) {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Make sure web fonts are ready before we measure/draw with them.
  try {
    if (document.fonts?.ready) await document.fonts.ready;
  } catch {
    /* ignore */
  }

  const bg = template?.backgroundColor || "#8054E8";
  const fg = template?.textColor || "#FFFFFF";
  const weight = template?.fontWeight || "400";
  const family = fontFamily || "ui-sans-serif, system-ui, sans-serif";
  const align = template?.textAlignment === "center" ? "center" : "left";

  // Background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const padX = 120;
  const maxW = W - padX * 2;
  const topReserve = 160; // category
  const bottomReserve = 230; // brand + author
  const maxTextH = H - topReserve - bottomReserve;

  // Word-wrap at a given font size (never splits a word).
  const wrap = (fs) => {
    ctx.font = `${weight} ${fs}px ${family}`;
    const words = quote.text.split(/\s+/);
    const lines = [];
    let line = "";
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  // Shrink the font until the text block fits the height and no line overflows.
  let fs = 96;
  let lines = wrap(fs);
  const lh = 1.12;
  while (fs > 34 && (lines.length * fs * lh > maxTextH || lines.some((l) => measure(ctx, l, weight, fs, family) > maxW))) {
    fs -= 3;
    lines = wrap(fs);
  }

  // Category label (top)
  if (quote.category) {
    ctx.font = `700 30px ui-sans-serif, system-ui, sans-serif`;
    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.65;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(quote.category.toUpperCase(), padX, 150);
    ctx.globalAlpha = 1;
  }

  // Quote block (vertically centered in the available area)
  const blockH = lines.length * fs * lh;
  let y = topReserve + Math.max(0, (maxTextH - blockH) / 2) + fs;
  const x = align === "center" ? W / 2 : padX;
  ctx.textAlign = align;
  ctx.fillStyle = fg;
  ctx.font = `${weight} ${fs}px ${family}`;
  for (const l of lines) {
    ctx.fillText(l, x, y);
    y += fs * lh;
  }

  // Author
  if (quote.author && quote.author !== "Unknown") {
    ctx.font = `600 34px ui-sans-serif, system-ui, sans-serif`;
    ctx.globalAlpha = 0.85;
    ctx.fillText(`— ${quote.author}`, x, y + 26);
    ctx.globalAlpha = 1;
  }

  // Brand tag (bottom-left) — the Darshtalks signature on every export.
  ctx.textAlign = "left";
  ctx.fillStyle = fg;
  ctx.globalAlpha = 0.95;
  ctx.font = `800 46px ui-sans-serif, system-ui, sans-serif`;
  ctx.fillText(BRAND, padX, H - 96);
  ctx.globalAlpha = 0.6;
  ctx.font = `500 28px ui-sans-serif, system-ui, sans-serif`;
  ctx.fillText(`words that feel · ${BRAND_URL}`, padX, H - 56);
  ctx.globalAlpha = 1;

  return await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png", 0.95)
  );
}

function measure(ctx, text, weight, fs, family) {
  ctx.font = `${weight} ${fs}px ${family}`;
  return ctx.measureText(text).width;
}

// Trigger a browser download for a Blob.
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function slugify(text, max = 40) {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, max) || "quote"
  );
}

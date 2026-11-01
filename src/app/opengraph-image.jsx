import { ImageResponse } from "next/og";

// Generate on the edge at request time. This avoids a Windows-only
// @vercel/og font-path resolution error during the static build.
export const runtime = "edge";

export const alt = "DarshTalks — Words that feel. Thoughts that stay.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#A855F7";
const MUTED = "#A1A1AA";

// Dynamically generated social share image (Open Graph + Twitter).
// NOTE: Satori requires every multi-child <div> to set display:flex.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090B",
          backgroundImage:
            "radial-gradient(1000px 500px at 85% 0%, rgba(168,85,247,0.35), transparent 60%)",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
          <span>Darsh</span>
          <span style={{ color: ACCENT }}>Talks</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800 }}>
            <span>Words that</span>
            <span style={{ color: ACCENT, marginLeft: 22 }}>feel.</span>
          </div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800 }}>
            <span>Thoughts that</span>
            <span style={{ color: ACCENT, marginLeft: 22 }}>stay.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: MUTED, marginTop: 30 }}>
            Quotes · Shayari · Thoughts — a typography gallery
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: MUTED,
          }}
        >
          <span>darshanparmardev.vercel.app</span>
          <span>by Darshan Parmar</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

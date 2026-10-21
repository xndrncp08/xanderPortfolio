import { ImageResponse } from "next/og";
import { profile } from "@/data/content";

export const alt = `${profile.name} — ${profile.role} in Calgary`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0d0d0c", color: "#f1efe9", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#9b978d" }}>
          {profile.role} · Calgary, by way of Manila
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, lineHeight: 0.9, fontWeight: 800, letterSpacing: -6, textTransform: "uppercase" }}>Xander</div>
          <div style={{ fontSize: 150, lineHeight: 0.9, fontWeight: 800, letterSpacing: -6, textTransform: "uppercase" }}>Rancap</div>
          <div style={{ display: "flex", marginTop: 36, fontSize: 34 }}>
            <span style={{ background: "#d4ff3a", color: "#0d0d0c", padding: "2px 10px" }}>Builds full-stack apps. Tests them properly.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#9b978d" }}>
          <span>xander-rancap.vercel.app</span>
          <span>No. 08</span>
        </div>
      </div>
    ),
    size
  );
}

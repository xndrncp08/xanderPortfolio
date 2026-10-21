import { ImageResponse } from "next/og";
import { profile } from "@/data/content";

export const alt = `${profile.name} — ${profile.role} in Calgary`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#f4f1ea", color: "#1b1a17", fontFamily: "Georgia, serif" }}>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, textTransform: "uppercase", color: "#5d594f" }}>
          {profile.role} · {profile.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 40, marginTop: 28, color: "#9f4220", maxWidth: 900 }}>
            Full-stack applications, carefully built and properly tested.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#5d594f", borderTop: "2px solid #dcd6c9", paddingTop: 24 }}>
          <span>xander-rancap.vercel.app</span>
          <span>No. 08</span>
        </div>
      </div>
    ),
    size
  );
}

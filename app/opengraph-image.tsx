import { ImageResponse } from "next/og";

export const alt = "Tito Agudelo — Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OG_SUBTITLE = "Senior Software Engineer · React Native · AI · Solutions Architecture";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          color: "#FAFAFA",
          background: "linear-gradient(180deg, #07091f 0%, #171035 58%, #32174e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", width: 96, height: 8, marginBottom: 32, background: "#7c3aed" }} />
        <div style={{ display: "flex", fontSize: 112, fontWeight: 700, lineHeight: 1.05 }}>Tito Agudelo</div>
        <div style={{ display: "flex", marginTop: 24, color: "#c4b5fd", fontSize: 34 }}>{OG_SUBTITLE}</div>
      </div>
    ),
    size,
  );
}

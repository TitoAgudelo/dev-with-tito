import { ImageResponse } from "next/og";

export const alt = "Tito Agudelo — Lead Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#FAFAFA",
          background: "linear-gradient(135deg, #09090B 0%, #111318 55%, #202544 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#A5B4FC", fontSize: 28, letterSpacing: 2 }}>
          DEV WITH TITO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 940 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            Engineering clarity for complex products.
          </div>
          <div style={{ display: "flex", color: "#C7CDD8", fontSize: 32 }}>
            Tito Agudelo · Lead Software Engineer
          </div>
        </div>
      </div>
    ),
    size,
  );
}

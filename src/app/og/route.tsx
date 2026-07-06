import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #075E54 0%, #128C7E 50%, #25D366 100%)",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "rgba(255,255,255,0.2)",
              marginBottom: 24,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 2.12.66 4.08 1.78 5.68L2 22l4.32-1.78C7.92 21.34 9.88 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="white"/>
            </svg>
          </div>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              lineHeight: 1.1,
              margin: 0,
              padding: "0 40px",
            }}
          >
            WhatsApp Automation Platform
          </h1>
          <p
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              marginTop: 16,
              marginBottom: 0,
              padding: "0 60px",
            }}
          >
            Automate WhatsApp Like Never Before
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              marginTop: 32,
            }}
          >
            <span style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>
              AI Auto Replies
            </span>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.4)" }} />
            <span style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>
              Bulk Messaging
            </span>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.4)" }} />
            <span style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>
              CRM Sync
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}

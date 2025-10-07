import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "NFT Marketplace - Buy, Sell & Create Digital Collectibles";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            marginBottom: 20,
            textAlign: "center",
            textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          NFT Marketplace
        </div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.9,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          Buy, Sell & Create Digital Collectibles
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 40,
            fontSize: 24,
            opacity: 0.8,
          }}
        >
          <span>🎨 Digital Art</span>
          <span>🎮 Gaming</span>
          <span>🏆 Collectibles</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

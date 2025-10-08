import { ImageResponse } from "next/og";

// Image metadata
export const alt = "NFT Marketplace - Digital Collectibles Platform";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
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
          padding: "40px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          NFT Marketplace
        </div>
        <div
          style={{
            fontSize: 36,
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Buy, Sell & Create Digital Collectibles
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: "30px",
            opacity: 0.8,
          }}
        >
          The Premier Web3 Marketplace
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

import { ImageResponse } from "next/og";

// Image metadata
export const alt = "NFT Marketplace";
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
          background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
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
            fontSize: 64,
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          🎨 NFT Marketplace
        </div>
        <div
          style={{
            fontSize: 32,
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Discover, collect, and sell extraordinary NFTs
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: "30px",
            padding: "10px 30px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50px",
          }}
        >
          Join the Web3 Revolution
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

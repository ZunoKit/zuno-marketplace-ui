"use client";

import { useEffect } from "react";

/**
 * Global Error Handler
 * Catches errors in root layout
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "500px" }}>
            <h1 style={{ fontSize: "4rem", margin: "0" }}>💥</h1>
            <h2 style={{ fontSize: "2rem", margin: "1rem 0" }}>
              Application Error
            </h2>
            <p
              style={{ fontSize: "1rem", color: "#666", marginBottom: "2rem" }}
            >
              A critical error has occurred. Please refresh the page or contact
              support if the problem persists.
            </p>
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button
                onClick={reset}
                style={{
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                }}
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #000",
                  borderRadius: "0.5rem",
                }}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

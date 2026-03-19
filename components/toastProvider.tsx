"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#ffffff",
          color: "#000000",
          border: "2px solid #000000",
          borderRadius: "14px",
          fontFamily: "var(--font-gloria)",
          padding: "12px 14px",
        },
        success: {
          iconTheme: {
            primary: "#000000",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#b91c1c",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}

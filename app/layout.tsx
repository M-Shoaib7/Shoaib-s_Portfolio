import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AvailableBadge from "@/components/ui/AvailableBadge";
import ContextMenu from "@/components/ui/ContextMenu";

export const metadata: Metadata = {
  title: "Muhammad Shoaib — Full Stack Developer & UI/UX Designer",
  description:
    "Muhammad Shoaib is a Full Stack Developer and UI/UX Designer based in Karachi, Pakistan. Specializing in Next.js, React, TypeScript, and stunning UI design.",
  keywords: [
    "Muhammad Shoaib",
    "Full Stack Developer",
    "UI UX Designer",
    "Next.js Developer",
    "React Developer",
    "Karachi Pakistan",
    "Freelance Developer",
    "Web Developer",
  ],
  authors: [{ name: "Muhammad Shoaib" }],
  creator: "Muhammad Shoaib",
  openGraph: {
    title: "Muhammad Shoaib — Full Stack Developer & UI/UX Designer",
    description:
      "I build digital experiences that matter. Full Stack Developer & UI/UX Designer based in Karachi, Pakistan.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Shoaib — Full Stack Developer",
    description: "I build digital experiences that matter.",
    creator: "@muhammadshoaib",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="overflow-x-hidden" style={{ background: "#050816", color: "#F3F4F6" }}>
        <CustomCursor />
        <ScrollProgress />
        <AvailableBadge />
        <ContextMenu />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1C1C2E",
              color: "#F3F4F6",
              border: "1px solid rgba(145,94,255,0.3)",
              borderRadius: "12px",
              fontFamily: "'Inter', sans-serif",
            },
            success: { iconTheme: { primary: "#915EFF", secondary: "#F3F4F6" } },
          }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Archive",
  description:
    "A living digital archive documenting the projects, achievements, knowledge, and ambitions of a software engineer.",
  keywords: ["portfolio", "archive", "software engineer", "developer"],
  openGraph: {
    title: "The Archive",
    description:
      "A living digital archive documenting the projects, achievements, knowledge, and ambitions of a software engineer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { ibmPlexSans, literata } from "@/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Analyzer",
  description:
    "Search for FREE books on archive.org (or input your own text) and have AI anaylize it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${ibmPlexSans.variable} ${literata.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

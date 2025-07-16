import Searchbar from "@/ui/Searchbar";
import { ReaderProvider } from "@/lib/context/ReaderContext";
import type { Metadata } from "next";
import { ibmPlexSans, literata } from "@/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Readiculous",
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
        <main className='min-h-screen bg-neutral-200 font-[literata] container mx-auto p-4'>
          <Searchbar />
          <ReaderProvider>{children}</ReaderProvider>
        </main>
      </body>
    </html>
  );
}

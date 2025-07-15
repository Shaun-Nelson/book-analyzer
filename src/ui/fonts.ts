import { IBM_Plex_Sans, Literata } from "next/font/google";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});
const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export { ibmPlexSans, literata };

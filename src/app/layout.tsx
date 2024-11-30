import {} from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Eczar, Fira_Sans } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import type { PropsWithChildren } from "react";

const icelandWinterstorm = localFont({
  src: "../fonts/IcelandWinterstorm.otf",
  variable: "--font-iceland-winterstorm",
  weight: "100 900",
});

const defaultFont = Fira_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const titleFont = Eczar({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-title",
});

export const metadata: Metadata = {
  title: "DSMC",
  description: "Do Studzienki movie club",
};

export default ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body
      className={`${icelandWinterstorm.variable} ${defaultFont.className} ${titleFont.variable} dark antialiased`}
    >
      {children}
    </body>
  </html>
);

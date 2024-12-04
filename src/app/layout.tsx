import type { Metadata } from "next";
import { Eczar, Roboto } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import type { PropsWithChildren } from "react";

const icelandWinterstorm = localFont({
  src: "../fonts/IcelandWinterstorm.otf",
  variable: "--font-iceland-winterstorm",
  weight: "100 900",
});

const titleFont = Eczar({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-title",
});

const roboto = Roboto({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "DSMC",
  description: "Do Studzienki movie club",
};

export default ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body
      className={` ${roboto.className} ${roboto.variable} ${icelandWinterstorm.variable} ${titleFont.variable} dark antialiased`}
    >
      {children}
    </body>
  </html>
);

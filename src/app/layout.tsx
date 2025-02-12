import type { Metadata } from "next";
import { Eczar, Roboto } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";
import ReactQueryProvider from "@/components/providers/query-client-provider";

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

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body
      className={` ${roboto.className} ${roboto.variable} ${icelandWinterstorm.variable} ${titleFont.variable} dark antialiased`}
    >
      <ReactQueryProvider>
        <NuqsAdapter>{children} </NuqsAdapter>
      </ReactQueryProvider>
    </body>
  </html>
);

export default RootLayout;

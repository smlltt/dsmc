import { AppSidebar } from "@/components/molecules/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const icelandWinterstorm = localFont({
  src: "../fonts/IcelandWinterstorm.otf",
  variable: "--font-iceland-winterstorm",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DSMC",
  description: "Do Studzienki movie club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${icelandWinterstorm.variable} dark antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <main className="bg-background">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}

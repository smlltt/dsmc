import { AppSidebar } from "@/components/molecules/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import type { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => (
  <SidebarProvider>
    <AppSidebar />
    <main className="relative z-0 min-h-screen w-full bg-background">
      <SidebarTrigger className="m-2 md:hidden" />
      <div className="relative z-10 max-w-3xl px-10 py-8">{children}</div>
      <Image
        className="fixed right-6 bottom-0 z-0"
        alt="skeleton"
        height={604 * 0.75}
        width={413 * 0.75}
        src={"/image/skeleton.png"}
      />
    </main>
  </SidebarProvider>
);

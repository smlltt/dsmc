import { AppSidebar } from "@/components/molecules/app-sidebar";
import { AppSidebarTrigger } from "@/components/molecules/app-sidebar-trigger";
import { Logo } from "@/components/molecules/logo";
import { SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";
import type { PropsWithChildren } from "react";

const MainNavigationLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative z-0 min-h-screen w-full bg-background">
        <div className="flex items-center justify-between px-6 py-4 sm:hidden">
          <AppSidebarTrigger className="md:hidden" />
          <Logo size="sm" />
          <div className="size-8" />
        </div>
        <div className="relative z-10 h-full px-6 pb-6 sm:px-10 sm:py-8">
          {children}
        </div>
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
};

export default MainNavigationLayout;

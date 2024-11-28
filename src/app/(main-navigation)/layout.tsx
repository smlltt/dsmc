import { AppSidebar } from "@/components/molecules/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => (
  <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger className="m-2 md:hidden" />
      <div className="bg-background px-10 py-8">{children}</div>
    </main>
  </SidebarProvider>
);

"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const AppSidebarLink = (props: {
  title: string;
  url: string | undefined;
  icon: string | StaticImport;
}) => {
  const pathname = usePathname();
  return (
    <SidebarMenuItem key={props.title}>
      <SidebarMenuButton
        className="gap-4"
        asChild
        isActive={pathname === props.url}
      >
        <a href={props.url}>
          <Image alt={props.title} width={24} height={24} src={props.icon} />
          <span className="mt-[3px] font-medium">{props.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

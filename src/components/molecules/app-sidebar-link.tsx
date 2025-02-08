"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AppSidebarLink = (props: {
  title: string;
  url: string | undefined;
  icon: string | StaticImport;
}) => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem key={props.title}>
      <SidebarMenuButton
        className="gap-4"
        asChild
        isActive={pathname === props.url}
      >
        <Link href={props.url || ""} onClick={() => setOpenMobile(false)}>
          <Image alt={props.title} width={24} height={24} src={props.icon} />
          <span className="mt-[3px] font-medium">{props.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

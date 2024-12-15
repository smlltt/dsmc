"use client";
import { RiMenuLine } from "react-icons/ri";
import { useSidebar } from "../ui/sidebar";
import { createTypedIcon } from "@/lib/utils";

const TypedRiMenuLine = createTypedIcon(RiMenuLine);

export const AppSidebarTrigger = ({ className }: { className?: string }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button className={className} type="button" onClick={toggleSidebar}>
      <TypedRiMenuLine className="size-8 fill-red-500" />
    </button>
  );
};

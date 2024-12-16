"use client";
import { createTypedIcon } from "@/lib/utils";
import { RiMenuLine } from "react-icons/ri";
import { useSidebar } from "../ui/sidebar";

const TypedRiMenuLine = createTypedIcon(RiMenuLine);

export const AppSidebarTrigger = ({ className }: { className?: string }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button className={className} type="button" onClick={toggleSidebar}>
      <TypedRiMenuLine className="size-8 fill-red-500" />
    </button>
  );
};

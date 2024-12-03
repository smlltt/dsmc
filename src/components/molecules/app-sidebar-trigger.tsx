"use client";
import { RiMenuLine } from "react-icons/ri";
import { useSidebar } from "../ui/sidebar";

export const AppSidebarTrigger = ({ className }: { className?: string }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button className={className} type="button" onClick={toggleSidebar}>
      <RiMenuLine className="size-8 fill-red-500" />
    </button>
  );
};

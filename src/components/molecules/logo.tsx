import { cn } from "@/lib/utils";
import Link from "next/link";

export const Logo = ({
  size = "lg",
  className,
}: { size?: "sm" | "lg"; className?: string }) => (
  <Link
    href="/"
    className={cn(
      "pb-4 text-center font-iceland text-red-500",
      size === "lg" ? "text-7xl" : "text-5xl",
      className,
    )}
  >
    {"DSMC"}
  </Link>
);

import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export const PageDefaultContentWrapper = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div className={cn("flex h-full max-w-3xl flex-col", className)}>
    {children}
  </div>
);

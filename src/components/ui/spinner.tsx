import { cn } from "@/lib/utils";

export const Spinner = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "inline-block size-4 animate-spin rounded-full border-2 border-current border-e-transparent",
      "border-solid align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white",
      className,
    )}
    role="status"
  />
);

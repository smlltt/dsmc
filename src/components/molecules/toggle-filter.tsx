"use client";

import { formatQueryPath } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export const ToggleFilter = ({
  items,
  queryKey,
}: {
  items: { id: string; label: ReactNode }[];
  queryKey: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onValueChange = (value: string[]) => {
    router.push(
      formatQueryPath(pathname, {
        ...Object.fromEntries(searchParams),
        [queryKey]: value.length ? value : undefined,
      }),
    );
  };

  return (
    <ToggleGroup
      onValueChange={onValueChange}
      defaultValue={[...new Set(searchParams.get(queryKey)?.split(","))]}
      type="multiple"
      className="flex flex-wrap justify-start gap-2"
    >
      {items.map((item) => (
        <ToggleGroupItem variant="outline" key={item.id} value={item.id}>
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

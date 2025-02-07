"use client";
import { Button } from "@/components/ui/button";
import { formatQueryPath } from "@/lib/utils";
import Link from "next/link";

export const Pagination = ({
  page,
  totalPages,
}: { page: number; totalPages?: number }) => {
  return (
    <div className="flex items-center justify-end gap-x-2 py-4">
      <Button variant="outline" size="sm" asChild disabled={page === 1}>
        <Link href={formatQueryPath("", { page: page - 1 })}>{"Previous"}</Link>
      </Button>
      {totalPages && <div>{`${page} / ${totalPages}`}</div>}
      <Button
        variant="outline"
        size="sm"
        asChild
        disabled={!!totalPages && page === totalPages}
      >
        <Link href={formatQueryPath("", { page: page + 1 })}>{"Next"}</Link>
      </Button>
    </div>
  );
};

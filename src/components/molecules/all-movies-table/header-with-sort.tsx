import { Button } from "@/components/ui/button";
import type { FetchAllMoviesReturnType } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import type { HeaderContext } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import type React from "react";
import type { FC } from "react";

interface HeaderWithSortProps {
  column: HeaderContext<FetchAllMoviesReturnType[number], unknown>["column"];
  title: string;
  wrapperProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const HeaderWithSort: FC<HeaderWithSortProps> = ({
  column,
  title,
  wrapperProps,
}) => {
  return (
    <div className={cn("w-52 text-center", wrapperProps?.className)}>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default HeaderWithSort;

import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  ColumnDefTemplate,
  HeaderContext,
  StringOrTemplateHeader,
} from "@tanstack/react-table";
import { FetchAllMoviesReturnType } from "@/lib/definitions";
import { cn } from "@/lib/utils";

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
    <div className={cn("text-center w-52", wrapperProps?.className)}>
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

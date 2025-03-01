"use client";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, HTMLProps } from "react";
import { cn } from "@/lib/utils";

interface FilterContentProps {
  selectTriggerClassName?: HTMLProps<HTMLElement>["className"];
}

const FilterContent: FC<FilterContentProps> = ({ selectTriggerClassName }) => {
  return (
    <>
      <SelectTrigger className={cn("w-[180px]", selectTriggerClassName)}>
        <SelectValue placeholder={"No Selection"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="null">No Selection</SelectItem>
          <SelectItem value="2">Want to See</SelectItem>
          <SelectItem value="1">Maybe</SelectItem>
          <SelectItem value="0">Don't want to see</SelectItem>
          <SelectItem value="-1">Seen</SelectItem>
        </SelectGroup>
      </SelectContent>
    </>
  );
};
export default FilterContent;

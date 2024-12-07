"use client";
import { Toggle } from "@/components/ui/toggle";
import {
  RiEyeFill,
  RiStarFill,
  RiStarHalfLine,
  RiStarLine,
} from "react-icons/ri";

export const ReactionRate = ({
  wantToSee,
}: {
  wantToSee?: number;
}) => {
  return (
    <form className="flex gap-1">
      <Toggle className="mr-3">
        <RiEyeFill />
      </Toggle>
      <Toggle pressed={wantToSee === 0}>
        <RiStarLine className="text-red-500" />
      </Toggle>
      <Toggle pressed={wantToSee === 1}>
        <RiStarHalfLine className="text-yellow-500" />
      </Toggle>
      <Toggle pressed={wantToSee === 2}>
        <RiStarFill className="text-green-500" />
      </Toggle>
    </form>
  );
};

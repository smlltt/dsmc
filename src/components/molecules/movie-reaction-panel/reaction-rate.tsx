"use client";
import { Toggle } from "@/components/ui/toggle";
import {
  RiEyeFill,
  RiStarFill,
  RiStarHalfLine,
  RiStarLine,
} from "react-icons/ri";
import { addOrUpdateReaction } from "@/lib/actions/movies";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { createTypedIcon } from "@/lib/utils";

const TypedRiEyeFill = createTypedIcon(RiEyeFill);
const TypedRiStarLine = createTypedIcon(RiStarLine);
const TypedRiStarHalfLine = createTypedIcon(RiStarHalfLine);
const TypedRiStarFill = createTypedIcon(RiStarFill);

export const ReactionRate = ({
  wantToSee,
  movieId,
}: {
  wantToSee?: number;
  movieId?: string;
}) => {
  //TODO replace with useOptimistic
  const [pending, setPending] = useState(false);
  const emptyStarPressed = wantToSee === 0;
  const halfStarPressed = wantToSee === 1;
  const fullStarPressed = wantToSee === 2;

  const handleReaction = async (reaction: number) => {
    if (reaction === wantToSee) return;

    setPending(true);
    try {
      movieId && (await addOrUpdateReaction(movieId, reaction));
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 1000);
    }
  };

  if (pending) {
    return <Skeleton className={"h-9 w-[166px]"} />;
  }

  return (
    <form className="flex gap-1">
      <Toggle className="mr-3">
        <TypedRiEyeFill />
      </Toggle>
      <Toggle
        pressed={emptyStarPressed}
        onClick={() => handleReaction(0)}
        disabled={pending}
      >
        <TypedRiStarLine className="text-red-500" />
      </Toggle>
      <Toggle
        pressed={halfStarPressed}
        onClick={() => handleReaction(1)}
        disabled={pending}
      >
        <TypedRiStarHalfLine className="text-yellow-500" />
      </Toggle>
      <Toggle
        pressed={fullStarPressed}
        onClick={() => handleReaction(2)}
        disabled={pending}
      >
        <TypedRiStarFill className="text-green-500" />
      </Toggle>
    </form>
  );
};

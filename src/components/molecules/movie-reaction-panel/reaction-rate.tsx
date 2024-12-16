"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import { addOrUpdateReaction } from "@/lib/actions/movies";
import { createTypedIcon } from "@/lib/utils";
import { useTransition } from "react";
import {
  RiEyeFill,
  RiStarFill,
  RiStarHalfLine,
  RiStarLine,
} from "react-icons/ri";

const TypedRiEyeFill = createTypedIcon(RiEyeFill);
const TypedRiStarLine = createTypedIcon(RiStarLine);
const TypedRiStarHalfLine = createTypedIcon(RiStarHalfLine);
const TypedRiStarFill = createTypedIcon(RiStarFill);

export const ReactionRate = ({
  wantToSee,
  movieId,
  hasSeen,
}: {
  wantToSee?: number | null;
  movieId?: string;
  hasSeen?: boolean | null;
}) => {
  const [isPending, startTransition] = useTransition();
  const emptyStarPressed = wantToSee === 0;
  const halfStarPressed = wantToSee === 1;
  const fullStarPressed = wantToSee === 2;
  const handleReaction = async (
    wantToSeeReaction: number,
    hasSeenReaction: boolean,
  ) => {
    if (wantToSeeReaction === wantToSee && hasSeenReaction === hasSeen) return;
    startTransition(async () => {
      try {
        movieId &&
          (await addOrUpdateReaction(
            movieId,
            wantToSeeReaction,
            hasSeenReaction,
          ));
      } catch (error) {
        alert("Something went wrong!");
      }
    });
  };

  if (isPending) {
    return <Skeleton className={"h-9 w-[166px]"} />;
  }

  return (
    <form className="flex gap-1">
      <Toggle
        className="mr-3"
        pressed={!!hasSeen}
        onClick={() => handleReaction(wantToSee || 0, !hasSeen)}
      >
        <TypedRiEyeFill />
      </Toggle>
      <Toggle
        pressed={emptyStarPressed}
        onClick={() => handleReaction(0, !!hasSeen)}
        disabled={isPending}
      >
        <TypedRiStarLine className="text-red-500" />
      </Toggle>
      <Toggle
        pressed={halfStarPressed}
        onClick={() => handleReaction(1, !!hasSeen)}
        disabled={isPending}
      >
        <TypedRiStarHalfLine className="text-yellow-500" />
      </Toggle>
      <Toggle
        pressed={fullStarPressed}
        onClick={() => handleReaction(2, !!hasSeen)}
        disabled={isPending}
      >
        <TypedRiStarFill className="text-green-500" />
      </Toggle>
    </form>
  );
};

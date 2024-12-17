"use client";
import { Toggle } from "@/components/ui/toggle";
import {
  addOrUpdateReaction,
  AddOrUpdateReactionPayload,
} from "@/lib/actions/movies";
import { createTypedIcon } from "@/lib/utils";
import { useOptimistic, useTransition } from "react";
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
  const [optimisticHasSeen, setOptimisticHasSeen] = useOptimistic(hasSeen);
  const [optimisticWantToSee, setOptimisticWantToSee] =
    useOptimistic(wantToSee);
  const [_, startTransition] = useTransition();
  const emptyStarPressed = optimisticWantToSee === 0;
  const halfStarPressed = optimisticWantToSee === 1;
  const fullStarPressed = optimisticWantToSee === 2;
  const handleReaction = async ({
    wantToSeeReaction,
    hasSeenReaction,
  }: AddOrUpdateReactionPayload) => {
    if (wantToSeeReaction !== undefined && wantToSeeReaction === wantToSee)
      return;

    startTransition(async () => {
      if (hasSeenReaction) {
        setOptimisticHasSeen(hasSeenReaction);
      }
      if (wantToSeeReaction) {
        setOptimisticWantToSee(wantToSeeReaction);
      }
      try {
        movieId &&
          (await addOrUpdateReaction(movieId, {
            wantToSeeReaction,
            hasSeenReaction,
          }));
      } catch (error) {
        alert("Something went wrong!");
      }
    });
  };

  return (
    <form className="flex gap-1">
      <Toggle
        className="mr-3"
        pressed={!!optimisticHasSeen}
        onClick={() => handleReaction({ hasSeenReaction: !hasSeen })}
      >
        <TypedRiEyeFill />
      </Toggle>
      <Toggle
        pressed={emptyStarPressed}
        onClick={() => handleReaction({ wantToSeeReaction: 0 })}
      >
        <TypedRiStarLine className="text-red-500" />
      </Toggle>
      <Toggle
        pressed={halfStarPressed}
        onClick={() => handleReaction({ wantToSeeReaction: 1 })}
      >
        <TypedRiStarHalfLine className="text-yellow-500" />
      </Toggle>
      <Toggle
        pressed={fullStarPressed}
        onClick={() => handleReaction({ wantToSeeReaction: 2 })}
      >
        <TypedRiStarFill className="text-green-500" />
      </Toggle>
    </form>
  );
};

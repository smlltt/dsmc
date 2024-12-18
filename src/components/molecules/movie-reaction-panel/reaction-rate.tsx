"use client";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { AddOrUpdateReactionPayload } from "@/lib/actions/movies";
import { addOrUpdateReaction } from "@/lib/actions/movies";
import { createTypedIcon } from "@/lib/utils";
import type { ToggleProps } from "@radix-ui/react-toggle";
import { useOptimistic, useTransition } from "react";
import type { JSX, PropsWithChildren } from "react";
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

const ToggleTooltipItem = ({
  tooltip,
  children,
  ...props
}: PropsWithChildren<ToggleProps & { tooltip: string }>): JSX.Element => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div>
        <Toggle {...props}>{children}</Toggle>
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

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

  const handleReaction = async ({
    wantToSeeReaction,
    hasSeenReaction,
  }: AddOrUpdateReactionPayload) => {
    if (wantToSeeReaction !== undefined && wantToSeeReaction === wantToSee)
      return;

    startTransition(async () => {
      if (hasSeenReaction != null) {
        setOptimisticHasSeen(hasSeenReaction);
      }
      if (wantToSeeReaction != null) {
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
      <ToggleTooltipItem
        className="mr-3"
        pressed={!!optimisticHasSeen}
        onClick={() => handleReaction({ hasSeenReaction: !hasSeen })}
        tooltip="I've seen this movie."
      >
        <TypedRiEyeFill />
      </ToggleTooltipItem>
      <ToggleTooltipItem
        pressed={optimisticWantToSee === 0}
        onClick={() => handleReaction({ wantToSeeReaction: 0 })}
        tooltip="I don't want to see this movie."
      >
        <TypedRiStarLine className="text-red-500" />
      </ToggleTooltipItem>
      <ToggleTooltipItem
        pressed={optimisticWantToSee === 1}
        onClick={() => handleReaction({ wantToSeeReaction: 1 })}
        tooltip="I might want to see this movie."
      >
        <TypedRiStarHalfLine className="text-yellow-500" />
      </ToggleTooltipItem>
      <ToggleTooltipItem
        pressed={optimisticWantToSee === 2}
        onClick={() => handleReaction({ wantToSeeReaction: 2 })}
        tooltip="I want to see this movie!"
      >
        <TypedRiStarFill className="text-green-500" />
      </ToggleTooltipItem>
    </form>
  );
};

"use client";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  type AddOrUpdateReactionPayload,
  addOrUpdateReaction,
} from "@/lib/actions/movies";
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
  onReaction,
}: {
  wantToSee?: number | null;
  movieId: string;
  hasSeen?: boolean | null;
  onReaction?: () => void;
}) => {
  const [optimisticHasSeen, setOptimisticHasSeen] = useOptimistic(hasSeen);
  const [optimisticWantToSee, setOptimisticWantToSee] =
    useOptimistic(wantToSee);
  const [_, startTransition] = useTransition();

  const handleWantToSeeChange = async (
    wantToSeeNew: AddOrUpdateReactionPayload["wantToSee"],
  ) => {
    onReaction?.();
    startTransition(async () => {
      setOptimisticWantToSee(wantToSeeNew);
      await addOrUpdateReaction(movieId, {
        wantToSee: wantToSeeNew,
      });
    });
  };

  const handleHaveSeenChange = async (
    hasSeenNew: AddOrUpdateReactionPayload["hasSeenMovie"],
  ) => {
    onReaction?.();
    startTransition(async () => {
      setOptimisticHasSeen(hasSeenNew);
      await addOrUpdateReaction(movieId, {
        hasSeenMovie: hasSeenNew,
      });
    });
  };

  return (
    <form className="flex gap-1">
      <ToggleTooltipItem
        className="mr-3"
        pressed={!!optimisticHasSeen}
        onPressedChange={(pressed) => handleHaveSeenChange(pressed)}
        tooltip="I've seen this movie."
      >
        <TypedRiEyeFill />
      </ToggleTooltipItem>
      <ToggleTooltipItem
        pressed={optimisticWantToSee === 0}
        onPressedChange={(pressed) => handleWantToSeeChange(pressed ? 0 : null)}
        tooltip="I don't want to see this movie."
      >
        <TypedRiStarLine className="text-red-500" />
      </ToggleTooltipItem>
      <ToggleTooltipItem
        pressed={optimisticWantToSee === 1}
        onPressedChange={(pressed) => handleWantToSeeChange(pressed ? 1 : null)}
        tooltip="I might want to see this movie."
      >
        <TypedRiStarHalfLine className="text-yellow-500" />
      </ToggleTooltipItem>
      <ToggleTooltipItem
        pressed={optimisticWantToSee === 2}
        onPressedChange={(pressed) => handleWantToSeeChange(pressed ? 2 : null)}
        tooltip="I want to see this movie!"
      >
        <TypedRiStarFill className="text-green-500" />
      </ToggleTooltipItem>
    </form>
  );
};

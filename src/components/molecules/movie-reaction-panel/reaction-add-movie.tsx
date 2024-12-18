"use client";
import { Button } from "@/components/ui/button";
import { createMovie } from "@/lib/actions/movies";
import { cn } from "@/lib/utils";
import { createTypedIcon } from "@/lib/utils";
import { useActionState, useOptimistic } from "react";
import { RiStarFill } from "react-icons/ri";

const TypedRiStarFill = createTypedIcon(RiStarFill);

export const ReactionAddMovie = ({
  tmdbId,
  wantToSee,
}: {
  tmdbId: number;
  wantToSee?: number | null;
}) => {
  const [optimisticWantToSee, setOptimisticWantToSee] =
    useOptimistic(wantToSee);
  const [state, formAction, isPending] = useActionState(() => {
    setOptimisticWantToSee(2);
    return createMovie(tmdbId);
  }, undefined);

  if (state?.error) {
    return <p className="text-red-500 text-sm">{state?.error}</p>;
  }

  return (
    <form className="flex gap-2">
      {optimisticWantToSee ? (
        <p
          className={cn(
            "text-green-500 text-sm",
            isPending && "text-green-700",
          )}
        >
          {"You want to see this movie!"}
        </p>
      ) : (
        <Button variant="outline" type="submit" formAction={formAction}>
          <TypedRiStarFill className="text-green-500" />
          <p>{"Add a movie"}</p>
        </Button>
      )}
    </form>
  );
};

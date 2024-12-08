"use client";
import { Button } from "@/components/ui/button";
import { createMovie } from "@/lib/actions/movies";
import { cn } from "@/lib/utils";
import { useActionState, useOptimistic } from "react";
import { RiStarFill } from "react-icons/ri";
import { createTypedIcon } from "@/lib/utils";

const TypedRiStarFill = createTypedIcon(RiStarFill);

export const ReactionAddMovie = ({
  tmdbId,
  wantToSee,
}: {
  tmdbId: number;
  wantToSee?: number;
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
            isPending && "animate-pulse text-green-700",
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
      {/* todo: hgandle more Reactions */}
      {/* <Toggle onClick={() => createMovie(movie.id)}>
        <RiEyeFill />
      </Toggle>
      <Separator orientation="vertical" />
      <Toggle pressed={wantToSee === 0}>
        <RiStarLine className="text-red-500" />
      </Toggle>
      <Toggle pressed={wantToSee === 1}>
        <RiStarHalfLine className="text-yellow-500" />
      </Toggle>
      <Toggle pressed={wantToSee === 2}>
        <RiStarFill className="text-green-500" />
      </Toggle> */}
    </form>
  );
};

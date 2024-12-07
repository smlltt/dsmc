"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createMovie } from "@/lib/actions/movies";
import { useActionState } from "react";
import { RiStarFill } from "react-icons/ri";

export const ReactionAddMovie = ({
  tmdbId,
  wantToSee,
}: {
  tmdbId: number;
  wantToSee?: number;
}) => {
  const createMovieWithId = createMovie.bind(null, tmdbId);
  const [_, formAction, isPending] = useActionState(createMovieWithId, {
    message: "",
  });

  if (isPending) {
    return <Skeleton className="h-9 w-36 rounded-md" />;
  }

  return (
    <form className="flex gap-2">
      {wantToSee ? (
        <p className="text-green-500 text-sm">
          {"You want to see this movie!"}
        </p>
      ) : (
        <Button variant="outline" type="submit" formAction={formAction}>
          <RiStarFill className="text-green-500" />
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

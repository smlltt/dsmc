"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import {
  RiCloseCircleLine,
  RiEyeFill,
  RiStarFill,
  RiStarHalfLine,
  RiStarLine,
} from "react-icons/ri";
import { createMovie } from "@/lib/actions/movies";

export const MovieSearchCard = ({
  movie,
  genres,
  wantToSee,
}: {
  movie: {
    id: number;
    poster_path: string | null;
    backdrop_path: string | null;
    title: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
  };
  genres?: string[];
  wantToSee: 0 | 1 | 2;
}) => {
  return (
    <Card
      className="relative flex flex-wrap items-stretch gap-2 overflow-hidden bg-background"
      key={movie.id}
    >
      {movie.backdrop_path && (
        <>
          <img
            className="absolute top-0 right-0 left-0 z-0 sm:hidden"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="poster"
          />
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent via-background to-background sm:hidden" />
        </>
      )}
      <div className="hidden w-32 items-center sm:flex">
        {movie.poster_path ? (
          <img
            className="relative"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="poster"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-500">
            <RiCloseCircleLine size={32} className="text-slate-400" />
          </div>
        )}
      </div>
      <div className="z-10 mt-32 flex flex-1 flex-col justify-between px-2 py-3 sm:mt-0">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <p className="text-xl">
              {movie.title}{" "}
              <span className="text-base text-muted-foreground">{`(${movie.release_date.slice(0, 4)})`}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p>{movie.vote_average}</p>
            <RiStarFill className="text-yellow-400" />
            <Separator orientation="vertical" />
            <p>{`${movie.vote_count} votes`}</p>
          </div>
          <p className="text-sm">{genres?.join(", ")}</p>
        </div>
        <div className="mt-2 flex gap-2 self-end">
          <Toggle
            onPressedChange={(pressed) =>
              pressed
                ? createMovie(movie.id as number)
                : console.log(
                    "delete movie if no one else wants to see it, otherwise just update movie reaction to want to see 0",
                  )
            }
          >
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
          </Toggle>
        </div>
      </div>
    </Card>
  );
};

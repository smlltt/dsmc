"use client";

import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import {
  RiEyeOffFill,
  RiStarFill,
  RiStarHalfLine,
  RiStarLine,
} from "react-icons/ri";
import { createMovie } from "@/lib/actions/movies";
import { MovieSchemaType } from "@/lib/definitions";

export const MovieSearchCard = ({ movie }: { movie: MovieSchemaType }) => {
  return (
    <Card className="flex gap-2 overflow-hidden" key={movie.id}>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        width={100}
        alt="poster"
      />
      <div className="flex flex-1 flex-col justify-between p-2 sm:flex-row">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-xl">{movie.title}</p>
            <p>{movie.release_date}</p>
          </div>
          <div className="flex items-center gap-2">
            <p>{movie.vote_average}</p>
            <RiStarFill className="text-yellow-400" />
            <p>{`| ${movie.vote_count} votes`}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <Toggle>
            <RiEyeOffFill />
          </Toggle>
          <button onClick={() => createMovie(movie.id as number)}>
            test action
          </button>
          <div className="flex gap-2">
            <RiStarLine />
            <RiStarHalfLine />
            <RiStarFill />
          </div>
        </div>
      </div>
    </Card>
  );
};

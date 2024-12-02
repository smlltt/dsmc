import { Separator } from "@/components/ui/separator";
import { RiStarFill } from "react-icons/ri";
import type { MovieCardMovie } from "./types";

export const BasicInfo = ({
  movie,
}: {
  movie: MovieCardMovie;
}) => (
  <div className="flex flex-col gap-1">
    <p className="text-xl">
      {movie.title}{" "}
      <span className="text-base text-muted-foreground">{`(${movie.release_date.slice(0, 4)})`}</span>
    </p>
    <div className="flex items-center gap-2">
      <p>{movie.vote_average}</p>
      <RiStarFill className="text-yellow-400" />
      <Separator orientation="vertical" />
      <p>{`${movie.vote_count} votes`}</p>
    </div>
  </div>
);

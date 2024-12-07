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
      <RiStarFill className="text-yellow-400" />
      <p className="font-bold">
        {movie.vote_average.toFixed(2)}
        <span className="font-normal text-muted-foreground">{" /10"}</span>
      </p>
      <Separator orientation="vertical" />
      <p className="text-muted-foreground text-sm">{`${movie.vote_count} votes`}</p>
    </div>
  </div>
);
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

export const MovieSearchCard = ({
  movie,
  genres,
  wantToSee,
}: {
  movie: {
    id: number;
    poster_path: string | null;
    title: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
  };
  genres?: string[];
  wantToSee: 0 | 1 | 2;
}) => (
  <Card className="flex flex-wrap gap-2 overflow-hidden" key={movie.id}>
    <div className="h-36 w-24 overflow-hidden">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          height={100}
          width={100}
          alt="poster"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-500">
          <RiCloseCircleLine size={32} className="text-slate-400" />
        </div>
      )}
    </div>
    <div className="flex flex-1 flex-col justify-between px-2 py-3">
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
      <div className="flex gap-2 self-end">
        <Toggle>
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

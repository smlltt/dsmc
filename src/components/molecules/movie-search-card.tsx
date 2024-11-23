import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import {
  RiEyeOffFill,
  RiStarFill,
  RiStarHalfLine,
  RiStarLine,
} from "react-icons/ri";

export const MovieSearchCard = ({
  movie,
}: {
  movie: {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
  };
}) => (
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
        <Toggle>Chce zobaczyć</Toggle>
        <div className="flex gap-2">
          <RiStarLine />
          <RiStarHalfLine />
          <RiStarFill />
        </div>
      </div>
    </div>
  </Card>
);

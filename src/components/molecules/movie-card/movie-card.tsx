import { Card } from "@/components/ui/card";
import { Details, DetailsLink } from "../movie-details";
import { Backdrop } from "./backdrop";
import { BasicInfo } from "./basic-info";
import { Poster } from "./poster";
import type { MovieCardMovie } from "./types";

export const MovieCard = ({
  movie,
  directors,
  reactionPanel,
}: {
  movie: MovieCardMovie;
  directors?: string[];
  reactionPanel?: JSX.Element;
}) => {
  return (
    <Card
      className="flex flex-col overflow-hidden bg-background"
      key={movie.id}
    >
      <div className="relative flex flex-wrap items-stretch">
        <Backdrop url={movie.backdrop_path} />
        <div className="hidden overflow-hidden sm:block">
          <Poster url={movie.poster_path} />
        </div>
        <div className="z-10 mt-32 flex flex-1 flex-col justify-between px-4 py-3 sm:mt-0">
          <BasicInfo movie={movie} directors={directors} />
          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            {reactionPanel || <div />}
            <DetailsLink className="self-end sm:self-auto" id={movie.id} />
          </div>
        </div>
      </div>
      <Details
        id={movie.id}
        containerClassName="p-4 sm:p-6 z-10 bg-background"
      />
    </Card>
  );
};

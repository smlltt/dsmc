import { Card } from "@/components/ui/card";
import { Details, DetailsLink } from "../movie-details";
import { Backdrop } from "./backdrop";
import { BasicInfo } from "./basic-info";
import { Poster } from "./poster";
import { ReactionPanel } from "./reaction-panel";
import type { MovieCardMovie } from "./types";

export const MovieCard = ({
  movie,
  wantToSee,
  onWantToSee,
}: {
  movie: MovieCardMovie;
  wantToSee?: number;
  onWantToSee?: () => void;
  onSeeDetails?: () => void;
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
          <BasicInfo movie={movie} />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <ReactionPanel
              movie={movie}
              wantToSee={wantToSee}
              onWantToSee={onWantToSee}
            />
            <DetailsLink id={movie.id} />
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

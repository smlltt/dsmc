import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
  showDetails,
}: {
  movie: MovieCardMovie;
  wantToSee: 0 | 1 | 2;
  onWantToSee?: () => void;
  onSeeDetails?: () => void;
  showDetails?: boolean;
}) => {
  return (
    <Card
      className="flex flex-col overflow-hidden bg-background"
      key={movie.id}
    >
      <div className="relative flex flex-wrap items-stretch gap-2">
        <Backdrop url={movie.backdrop_path} />
        <div
          className={cn(
            "hidden overflow-hidden sm:block",
            "transition-all duration-300",
            showDetails && "ml-6 translate-y-4 rounded-sm",
          )}
        >
          <Poster url={movie.poster_path} />
        </div>
        <div className="z-10 mt-32 flex flex-1 flex-col justify-between px-2 py-3 sm:mt-0">
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
      {/* <div className="overflow-hidden">
        <div
          className={cn(
            "mt-[-100%]",
            "opacity-0 transition-all duration-500",
            showDetails && "mt-6 opacity-100",
          )}
        >
          <div className="m-6 mt-10">
            <Details />
          </div>
        </div>
      </div> */}
      <Details id={movie.id} containerClassName="p-6" />
    </Card>
  );
};

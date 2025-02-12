import { auth } from "@/auth";
import { MovieCard } from "@/components/molecules/movie-card";
import {
  ReactionOverview,
  ReactionRate,
} from "@/components/molecules/movie-reaction-panel";
import { Pagination } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { fetchMoviesToWatch } from "@/lib/data/movies";
import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

const loadSearchParams = createLoader({
  page: parseAsInteger.withDefault(1),
  user: parseAsArrayOf(parseAsString),
});

const WatchPage = async (props: {
  searchParams: Promise<{
    user: string[];
    genre: string[];
    maxRuntime: string[];
  }>;
}) => {
  const { page, user } = await loadSearchParams(props.searchParams);
  const session = await auth();
  const userId = session?.user?.id;

  const movies = await fetchMoviesToWatch({ page, userFilter: user });

  return (
    <>
      {movies.map((movie) => {
        const myReaction = movie.movieReactions.find(
          (r) => r.userId === userId,
        );
        return (
          <MovieCard
            key={movie.id}
            movie={{ ...movie, id: movie.tmdbId }}
            reactionPanel={
              <div className="flex flex-1 flex-col justify-stretch gap-4">
                <ReactionRate
                  movieId={movie.id}
                  wantToSee={myReaction?.wantToSee}
                  hasSeen={myReaction?.hasSeenMovie}
                />
                <Separator />
                <ReactionOverview reactions={movie.movieReactions || []} />
              </div>
            }
          />
        );
      })}
      <Pagination page={page} />
    </>
  );
};

export default WatchPage;

import { MovieCard } from "@/components/molecules/movie-card";
import { ReactionOverview } from "@/components/molecules/movie-reaction-panel";
import { Pagination } from "@/components/ui/pagination";
import { fetchMoviesToWatch } from "@/lib/data/movies";
import { fetchUsersCount } from "@/lib/data/user";
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

  const [movies, usersCount] = await Promise.all([
    fetchMoviesToWatch({ page, userFilter: user }),
    fetchUsersCount(),
  ]);

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={{ ...movie, id: movie.tmdbId }}
          reactionPanel={
            <ReactionOverview
              reactions={movie.movieReactions || []}
              usersCount={usersCount}
            />
          }
        />
      ))}
      <Pagination page={page} />
    </>
  );
};

export default WatchPage;

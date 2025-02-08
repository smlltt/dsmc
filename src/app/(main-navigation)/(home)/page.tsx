import { MovieCard } from "@/components/molecules/movie-card";
import {
  ReactionAddMovie,
  ReactionRate,
} from "@/components/molecules/movie-reaction-panel";
import { getMoviesFromDbByIDs } from "@/lib/data/movies";
import { searchMovies } from "@/lib/tmdb";
import { createTypedIcon } from "@/lib/utils";
import { RiCloseLine } from "react-icons/ri";

const TypedRiCloseLine = createTypedIcon(RiCloseLine);

const SearchPage = async (props: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams.search;

  if (!searchQuery) {
    return (
      <div className="flex w-full justify-center">
        <p>{"Type to search"}</p>
      </div>
    );
  }

  const movies = (await searchMovies(searchQuery))?.results
    ?.filter((m) => m.vote_average > 0)
    ?.slice(0, 5);

  if (!movies || movies.length === 0) {
    return (
      <div className="flex w-full items-center justify-center gap-2">
        <TypedRiCloseLine className="size-8" />
        <p>{"No results"}</p>
      </div>
    );
  }

  const moviesInDb = await getMoviesFromDbByIDs(movies.map((m) => m.id));

  return (
    <>
      {movies.map((movie) => {
        const movieInDb = moviesInDb?.find((m) => m.tmdbId === movie.id);
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            reactionPanel={
              !movieInDb ? (
                <ReactionAddMovie tmdbId={movie.id} />
              ) : (
                <ReactionRate
                  movieId={movieInDb.id}
                  wantToSee={movieInDb?.myReaction?.wantToSee}
                  hasSeen={movieInDb?.myReaction?.hasSeenMovie}
                />
              )
            }
          />
        );
      })}
    </>
  );
};

export default SearchPage;

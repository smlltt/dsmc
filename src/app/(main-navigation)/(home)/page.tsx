import { MovieCard } from "@/components/molecules/movie-card";
import { getReactions } from "@/lib/data/movies";
import { searchMovies } from "@/lib/tmdb";
import { RiCloseLine } from "react-icons/ri";

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

  const movies = (await searchMovies(searchQuery))?.results?.slice(0, 5);

  if (!movies || movies.length === 0) {
    return (
      <div className="flex w-full items-center justify-center gap-2">
        <RiCloseLine className="size-8" />
        <p>{"No results"}</p>
      </div>
    );
  }

  const reactions = await getReactions(movies.map((m) => m.id));

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          wantToSee={
            reactions?.find((r) => r.movie.tmdbId === movie.id)?.wantToSee
          }
        />
      ))}
    </>
  );
};

export default SearchPage;

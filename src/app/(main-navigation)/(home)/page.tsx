import { MovieCard } from "@/components/molecules/movie-card";
import { getReactions } from "@/lib/data/movies";
import { searchMovies } from "@/lib/tmdb";

const SearchPage = async (props: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams.search;

  const movies = searchQuery
    ? (await searchMovies(searchQuery))?.results?.slice(0, 5)
    : null;

  if (!movies || movies.length === 0) {
    return <p>{"No results"}</p>;
  }

  const reactions = await getReactions(movies.map((m) => m.id));

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          wantToSee={
            reactions.find((r) => r.movie.tmdbId === movie.id)?.wantToSee
          }
        />
      ))}
    </>
  );
};

export default SearchPage;

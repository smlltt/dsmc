import { MovieCard } from "@/components/molecules/movie-card";
import { searchMovies } from "@/lib/tmdb";

export const MovieSearchResults = async ({
  searchQuery,
}: { searchQuery: string }) => {
  const movies = await searchMovies(searchQuery);

  if (movies.results.length === 0) {
    return <p>{"No results"}</p>;
  }

  return (
    <>
      {movies.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} wantToSee={0} />
      ))}
    </>
  );
};

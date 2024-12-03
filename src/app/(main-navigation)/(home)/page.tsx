import { MovieCard } from "@/components/molecules/movie-card";
import { searchMovies } from "@/lib/tmdb";

const SearchPage = async (props: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams.search;

  const movies = searchQuery ? await searchMovies(searchQuery) : null;

  if (!movies || movies.results.length === 0) {
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

export default SearchPage;

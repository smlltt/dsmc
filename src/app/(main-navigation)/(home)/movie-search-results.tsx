import { MovieSearchCard } from "@/components/molecules/movie-search-card";
import { getGenres, searchMovies } from "@/lib/tmdb";

export const MovieSearchResults = async ({
  searchQuery,
}: { searchQuery?: string }) => {
  const movies = await searchMovies(searchQuery);
  const genresResponse = await getGenres();

  if (movies.results.length === 0) {
    return <p>{"No results"}</p>;
  }

  return (
    <>
      {movies.results.map((movie) => (
        <MovieSearchCard
          key={movie.id}
          movie={movie}
          genres={
            genresResponse.genres &&
            (movie.genre_ids
              .map(
                (gId) => genresResponse.genres?.find((g) => g.id === gId)?.name,
              )
              ?.filter((n) => !!n) as string[])
          }
          wantToSee={0}
        />
      ))}
    </>
  );
};

import { MovieSearchCard } from "@/components/molecules/movie-search-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchMovies } from "@/lib/tmdb";

export default async () => {
  const movies = await searchMovies();

  console.log(movies);

  return (
    <div>
      <div className="mb-8 flex gap-2">
        <Input placeholder="Add a movie" />
        <Button>{"Add a movie"}</Button>
      </div>
      <div className="flex flex-col gap-3">
        {movies.results.map((movie) => (
          <MovieSearchCard key={movie.id} movie={movie} wantToSee={0} />
        ))}
      </div>
    </div>
  );
};

import { MovieCard } from "@/components/molecules/movie-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { searchMovies } from "@/lib/tmdb";

export default async () => {
  const movies = await searchMovies("New york");

  return (
    <>
      {movies.results.map((movie) => (
        <Card className="bg-slate-800 p-3" key={movie.id}>
          <div className="mb-4 flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>
              <span className="font-bold text-lg">{"User name"}</span>
              <span className="text-muted-foreground">{" has added"}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 ">
            <MovieCard movie={movie} wantToSee={0} />
            <MovieCard movie={movie} wantToSee={0} />
          </div>
        </Card>
      ))}
    </>
  );
};

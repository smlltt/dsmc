import { MovieSearchCard } from "@/components/molecules/movie-search-card";
import { PageDefaultContentWrapper } from "@/components/molecules/page-default-content-wrapper";
import { PageTitle } from "@/components/molecules/page-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { searchMovies } from "@/lib/tmdb";

export default async () => {
  const movies = await searchMovies();

  return (
    <div>
      <PageTitle>{"Movies added by your friends"}</PageTitle>
      <PageDefaultContentWrapper className="mt-10 gap-4">
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
              <MovieSearchCard movie={movie} wantToSee={0} />
              <MovieSearchCard movie={movie} wantToSee={0} />
            </div>
          </Card>
        ))}
      </PageDefaultContentWrapper>
    </div>
  );
};

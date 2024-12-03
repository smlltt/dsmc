import { MovieSearchCard } from "@/components/molecules/movie-search-card";
import { PageDefaultContentWrapper } from "@/components/molecules/page-default-content-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGenres, searchMovies } from "@/lib/tmdb";
import { auth, signOut } from "@/auth";

export default async () => {
  const session = await auth();
  // if (!session?.user) {
  //   redirect("/login");
  // }
  const movies = await searchMovies();
  const genresResponse = await getGenres();

  return (
    <div>
      <div className="mb-8 flex gap-2">
        <Input placeholder="Add a movie" />
        <Button>{"Add a movie"}</Button>
      </div>
      {/*  TODO remove test*/}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
      <PageDefaultContentWrapper className="gap-3">
        {movies.results.map((movie) => (
          <MovieSearchCard
            key={movie.id}
            movie={movie}
            genres={
              genresResponse.genres &&
              (movie.genre_ids
                .map(
                  (gId) =>
                    genresResponse.genres?.find((g) => g.id === gId)?.name,
                )
                ?.filter((n) => !!n) as string[])
            }
            wantToSee={0}
          />
        ))}
      </PageDefaultContentWrapper>
    </div>
  );
};

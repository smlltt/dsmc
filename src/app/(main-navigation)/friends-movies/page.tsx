import { MovieCard } from "@/components/molecules/movie-card";
import { ReactionRate } from "@/components/molecules/movie-reaction-panel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { fetchFriendsMovies } from "@/lib/data/movies";
import { createLoader, parseAsInteger } from "nuqs/server";
import type { FriendMovie } from "./interface";

const loadSearchParams = createLoader({
  page: parseAsInteger.withDefault(1),
});

const FriendsMoviesPage = async (props: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await loadSearchParams(props.searchParams);

  const { results: movies, totalPages } = await fetchFriendsMovies(page);

  const grouppedMovies = movies.reduce(
    (
      acc: { key: string; user: FriendMovie["user"]; movies: FriendMovie[] }[],
      movie,
    ) => {
      if (!!acc.length && acc.at(-1)?.user?.id === movie.user.id) {
        acc.at(-1)?.movies?.push(movie);
      } else {
        acc.push({
          key: `${movie.user.id}-${movie.id}`,
          user: movie.user,
          movies: [movie],
        });
      }

      return acc;
    },
    [],
  );

  return (
    <>
      {grouppedMovies.map((group) => (
        <Card className="bg-gray-800 p-3" key={group.key}>
          <div className="mb-4 flex items-center gap-3">
            <Avatar>
              <AvatarImage src={group.user.image} />
              <AvatarFallback>
                {group.user.name
                  ?.split(" ")
                  ?.map((n) => n?.[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <p>
              <span className="font-bold text-lg">{group.user.name}</span>
              <span className="text-muted-foreground">{" has added"}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 ">
            {group.movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={{ ...movie, id: movie.tmdbId }}
                directors={movie.crew_members.map(
                  (member) => member.person.name,
                )}
                reactionPanel={
                  <ReactionRate
                    movieId={movie.id}
                    wantToSee={movie.myReaction?.wantToSee}
                    hasSeen={movie.myReaction?.hasSeenMovie}
                  />
                }
              />
            ))}
          </div>
        </Card>
      ))}
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </>
  );
};

export default FriendsMoviesPage;

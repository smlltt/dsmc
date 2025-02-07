import { fetchFriendsMovies } from "@/lib/data/movies";
import { createLoader, parseAsInteger } from "nuqs/server";
import type { FriendMovie } from "./interface";
import { FriendsMoviesPageContent } from "./page-content";

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
    <FriendsMoviesPageContent
      grouppedMovies={grouppedMovies}
      totalPages={totalPages}
      page={page}
    />
  );
};

export default FriendsMoviesPage;

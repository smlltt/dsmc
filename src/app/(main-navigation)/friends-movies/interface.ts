import type { fetchFriendsMovies } from "@/lib/data/movies";

export type FriendMovie = Awaited<
  ReturnType<typeof fetchFriendsMovies>
>["results"][number];

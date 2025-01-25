"use client";

import { MovieCard } from "@/components/molecules/movie-card";
import { ReactionRate } from "@/components/molecules/movie-reaction-panel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatQueryPath } from "@/lib/utils";
import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import type { FriendMovie } from "./interface";

export const FriendsMoviesPageContent = ({
  grouppedMovies,
  page,
  totalPages,
}: {
  grouppedMovies: {
    key: string;
    user: FriendMovie["user"];
    movies: FriendMovie[];
  }[];
  page: number;
  totalPages: number;
}) => {
  const [optimisticMovies, optimisticRemoveMovie] = useOptimistic(
    grouppedMovies,
    (state, movieToRemove: FriendMovie) =>
      state.map((m) => ({
        ...m,
        movies: m.movies.filter((m) => m.id !== movieToRemove.id),
      })),
  );
  const [_, startTransition] = useTransition();

  return (
    <>
      {optimisticMovies.map((group) => (
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
                    onReaction={() => {
                      startTransition(() => {
                        optimisticRemoveMovie(movie);
                      });
                    }}
                  />
                }
              />
            ))}
          </div>
        </Card>
      ))}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-x-2 py-4">
          <Button variant="outline" size="sm" asChild disabled={page === 1}>
            <Link href={formatQueryPath("", { page: page - 1 })}>
              {"Previous"}
            </Link>
          </Button>
          <div>{`${page} / ${totalPages}`}</div>
          <Button
            variant="outline"
            size="sm"
            asChild
            disabled={page === totalPages}
          >
            <Link href={formatQueryPath("", { page: page + 1 })}>{"Next"}</Link>
          </Button>
        </div>
      )}
    </>
  );
};

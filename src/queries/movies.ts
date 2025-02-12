import { fetchAllMovies } from "@/lib/data/movies";
import { useQuery } from "@tanstack/react-query";

export const movieKeys = {
  all: () => ["movies"] as const,
  lists: () => [...movieKeys.all(), "list"] as const,
  list: (filter: string) => [...movieKeys.lists(), { filter }] as const,
  details: () => [...movieKeys.all(), "detail"] as const,
  detail: (id: string) => [...movieKeys.details(), id] as const,
};

export type IMovieKeys = ReturnType<(typeof movieKeys)[keyof typeof movieKeys]>;

const fetchMovies = async () => {
  const response = await fetch("/api/movies");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

type Movies = Awaited<ReturnType<typeof fetchAllMovies>>;

export const useMovies = (filter?: string) => {
  return useQuery<Movies>({
    queryKey: filter ? movieKeys.list(filter) : movieKeys.lists(),
    queryFn: fetchMovies,
  });
};

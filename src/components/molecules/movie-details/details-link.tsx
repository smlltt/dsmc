"use client";

import { Button } from "@/components/ui/button";
import { getMovieDetails } from "@/lib/tmdb";
import { preload } from "swr";
import { useMovieDetailsStore } from "./movie-details-store";

export const DetailsLink = ({
  id,
  className,
}: { id: number; className?: string }) => {
  const { clear, setId, movieDetailsId } = useMovieDetailsStore();

  return movieDetailsId === id ? (
    <Button className={className} onClick={clear} variant="link">
      {"Hide"}
    </Button>
  ) : (
    <Button
      className={className}
      onClick={() => setId(id)}
      onMouseEnter={() =>
        preload(["movie-details", id], () => getMovieDetails(id))
      }
      variant="link"
    >
      {"Show details"}
    </Button>
  );
};

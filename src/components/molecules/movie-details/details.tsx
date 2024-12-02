"use client";

import { getMovieDetails } from "@/lib/tmdb";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { RiTimeLine } from "react-icons/ri";
import useSWR from "swr";
import { ImdbLink } from "../imdb-link";
import { useMovieDetailsStore } from "./movie-details-store";

export const Details = ({
  id,
  containerClassName,
}: { id: number; containerClassName?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const movieDetailsId = useMovieDetailsStore((state) => state.movieDetailsId);
  const { data, error, isLoading } = useSWR(
    !!movieDetailsId && ["movie-details", movieDetailsId],
    () => getMovieDetails(movieDetailsId as number),
  );

  useEffect(() => {
    if (data) {
      ref.current?.scrollIntoView({ block: "center" });
    }
  }, [data]);

  if (isLoading || !data || id !== movieDetailsId) {
    return null;
  }

  return (
    <div ref={ref} className={cn("flex flex-col gap-2", containerClassName)}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm">
            <RiTimeLine className="mr-1 inline" />
            {`${data.runtime} min`}
          </p>
          <p className="font-bold text-sm">
            {data.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="font-bold text-sm">
            {data.production_countries?.map((g) => g.name).join(", ")}
          </p>
        </div>
        <ImdbLink imdbId={data.imdb_id} />
      </div>
      <p className="font-bold text-sm">
        Directing:{" "}
        {data.credits.crew
          .filter((c) => c.job === "Director")
          .map((c) => c.name)
          .join(", ")}
      </p>
      <p className="font-bold text-sm">
        {data.credits.cast
          .slice(0, 5)
          .map((c) => c.name)
          .join(", ")}
        {" ..."}
      </p>
      <p>{data.overview}</p>
    </div>
  );
};

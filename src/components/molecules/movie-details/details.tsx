"use client";

import { Separator } from "@/components/ui/separator";
import { getMovieDetails } from "@/lib/tmdb";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { RiTimeFill } from "react-icons/ri";
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
      <div className="mb-2 flex justify-between">
        <div className="mb-2 flex items-center">
          <RiTimeFill className="mr-1 mb-0.5" />
          <p className="font-bold text-sm">{`${data.runtime} min`}</p>
        </div>
        <ImdbLink imdbId={data.imdb_id} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm">{data.genres?.map((g) => g.name).join(", ")}</p>
        <p className="text-sm">
          {data.production_countries?.map((g) => g.name).join(", ")}
        </p>
      </div>
      <Separator />
      <p className="text-sm">
        <span className="font-bold">{"Directing"}</span>{" "}
        <span className="text-sky-500">
          {data.credits.crew
            .filter((c) => c.job === "Director")
            .map((c) => c.name)
            .join(", ")}
        </span>
      </p>
      <p className="text-sm">
        <span className="font-bold">{"Cast"}</span>{" "}
        <span className="text-sky-500">
          {data.credits.cast
            .slice(0, 5)
            .map((c) => c.name)
            .join(", ")}
          {" ..."}
        </span>
      </p>
      <Separator />
      <p>{data.overview}</p>
    </div>
  );
};

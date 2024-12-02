"use client";

import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { createMovie } from "@/lib/actions/movies";
import {
  RiEyeFill,
  RiStarFill,
  RiStarHalfLine,
  RiStarLine,
} from "react-icons/ri";
import type { MovieCardMovie } from "./types";

export const ReactionPanel = ({
  movie,
  wantToSee,
}: {
  movie: MovieCardMovie;
  wantToSee: 0 | 1 | 2;
  onWantToSee?: () => void;
}) => (
  <div className="flex gap-2">
    <Toggle onClick={() => createMovie(movie.id)}>
      <RiEyeFill />
    </Toggle>
    <Separator orientation="vertical" />
    <Toggle pressed={wantToSee === 0}>
      <RiStarLine className="text-red-500" />
    </Toggle>
    <Toggle pressed={wantToSee === 1}>
      <RiStarHalfLine className="text-yellow-500" />
    </Toggle>
    <Toggle pressed={wantToSee === 2}>
      <RiStarFill className="text-green-500" />
    </Toggle>
  </div>
);

"use client";

import { useMovies } from "@/queries/movies";

const MovieFetcher: React.FC = () => {
  useMovies();
  return null;
};

export default MovieFetcher;

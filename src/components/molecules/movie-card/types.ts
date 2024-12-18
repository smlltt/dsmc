import type { TmdbMovieI } from "@/lib/definitions";

export type MovieCardMovie = Pick<TmdbMovieI, "id" | "backdrop_path" | "poster_path" | "title" | "release_date" | "vote_average" | "vote_count"> ;

// export interface MovieCardMovie {
//   id: number;
//   poster_path: string | null;
//   backdrop_path: string | null;
//   title: string;
//   release_date: string;
//   vote_average: number;
//   vote_count: number;
// }

import type { TmdbMovie } from "@/lib/definitions";

export type MovieCardMovie = TmdbMovie;

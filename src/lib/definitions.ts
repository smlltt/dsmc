import type { fetchAllMovies, fetchMovies } from "@/lib/data/movies";
import type { CrewMember, Person } from "@prisma/client";

//tmdb

export interface TmdbMovieI {
  adult: boolean;
  backdrop_path: string | null
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TmdbMovieDetailsI {
  adult: boolean;
  belongs_to_collection: TmdbBelongsToCollectionI | null;
  backdrop_path: string | null;
  budget: number;
  genres: TmdbGenreI[];
  homepage: string;
  id: string;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  production_companies: TmdbProductionCompanyI[];
  production_countries: TmdbProductionCountryI[];
  poster_path: string | null;
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: TmdbSpokenLanguageI[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    crew: TmdbCrewMemberI[];
    cast: TmdbCastMemberI[];
  };
}

export interface TmdbMovieListResponseI {
  page: number;
  results: TmdbMovieI[];
  total_pages: number;
  total_results: number;
}

interface TmdbBelongsToCollectionI {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface TmdbGenreI {
  id: number;
  name: string;
}

interface TmdbProductionCompanyI {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TmdbProductionCountryI {
  iso_3166_1: string;
  name: string;
}

interface TmdbSpokenLanguageI {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface TmdbCrewMemberI {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
}
export interface TmdbCastMemberI {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

//db

export interface CreditDbI extends CrewMember {
  person: Person;
}

export type FetchMoviesReturnType = Awaited<ReturnType<typeof fetchMovies>>;
export type FetchAllMoviesReturnType = Awaited<
  ReturnType<typeof fetchAllMovies>
>;

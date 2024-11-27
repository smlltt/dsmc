import { Prisma } from "@prisma/client";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const baseURL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
};

export const searchMovies = () =>
  fetch(
    `${baseURL}/search/movie?${new URLSearchParams({
      page: "1",
      query: "enter",
    })}`,
    options,
  ).then((res) => res.json() as Promise<MovieResponse>);

export const searchMovie = (id: number) =>
  fetch(`${baseURL}/movie/${id}`, options).then(
    //not sure aobut this typing. maybe it's better to have a MovieDetailsInterface,
    //and then use Prisma.MovieCreateInput inside createMovie
    (res) => res.json() as Promise<Prisma.MovieCreateInput>,
  );

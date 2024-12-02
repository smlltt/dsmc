import { MovieResponse, SearchMovieResult } from "@/lib/definitions";

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
      query: "new york",
    })}`,
    options,
  ).then((res) => res.json() as Promise<MovieResponse>);

export const getGenres = () =>
  fetch(
    `${baseURL}/genre/movie/list?${new URLSearchParams({
      language: "en",
    })}`,
    options,
  ).then(
    (res) => res.json() as Promise<{ genres: { id: number; name: string }[] }>,
  );

export const searchMovie = (id: number) =>
  fetch(`${baseURL}/movie/${id}`, options).then(
    (res) => res.json() as Promise<SearchMovieResult>,
  );

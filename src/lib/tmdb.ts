import type {
  TmdbMovieDetails,
  TmdbMovieListResponse,
} from "@/lib/definitions";

const baseURL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
};

export const searchMovies = (query: string) =>
  fetch(
    `${baseURL}/search/movie?${new URLSearchParams({
      page: "1",
      query,
    })}`,
    options,
  ).then((res) => res.json() as Promise<TmdbMovieListResponse>);

export const getGenres = () =>
  fetch(
    `${baseURL}/genre/movie/list?${new URLSearchParams({
      language: "en",
    })}`,
    options,
  ).then(
    (res) => res.json() as Promise<{ genres: { id: number; name: string }[] }>,
  );

export const getMovieDetails = (id: number) =>
  fetch(`${baseURL}/movie/${id}?append_to_response=credits`, options).then(
    (res) =>
      res.json() as Promise<
        TmdbMovieDetails & { success?: false; status_message?: string }
      >,
  );

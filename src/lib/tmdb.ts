import type {
  TmdbMovieDetailsI,
  TmdbMovieListResponseI,
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
      pageSize: "5",
      query,
    })}`,
    options,
  ).then((res) => res.json() as Promise<TmdbMovieListResponseI>);

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
        TmdbMovieDetailsI & { success?: false; status_message?: string }
      >,
  );

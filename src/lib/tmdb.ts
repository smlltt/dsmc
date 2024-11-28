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
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
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

import { fetchMovies } from "@/lib/data/movies";

export default async function MoviesPage() {
  const movies = await fetchMovies();
  console.log({ CreateMovieTestPageMovies: movies });
  return <div className="bg-background p-10">CreateMovieTestPage</div>;
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchMovies } from "@/lib/tmdb";

export default async function Home() {
	const movies = await searchMovies();

	console.log(movies);

	return (
		<div className="p-10">
			<main>
				<div className="mb-8 flex gap-2">
					<Input placeholder="Add a movie" />
					<Button>{"Add a movie"}</Button>
				</div>
				{movies.results.map((movie) => (
					<div className="flex gap-2" key={movie.id}>
						<img
							src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
							width={100}
							alt="poster"
						/>
						<div className="flex flex-col gap-2">
							<p>{movie.title}</p>
							<p>{movie.release_date}</p>
						</div>
					</div>
				))}
			</main>
		</div>
	);
}

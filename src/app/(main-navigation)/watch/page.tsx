import { MovieSearchCard } from "@/components/molecules/movie-search-card";
import { PageDefaultContentWrapper } from "@/components/molecules/page-default-content-wrapper";
import { PageTitle } from "@/components/molecules/page-title";
import { Toggle } from "@/components/ui/toggle";
import { searchMovies } from "@/lib/tmdb";
import Image from "next/image";
import { RiHourglassFill, RiHourglassLine } from "react-icons/ri";

export default async () => {
  const movies = await searchMovies("New york");

  return (
    <div>
      <PageTitle>{"Choose a movie to watch"}</PageTitle>
      {/*  filters */}
      <div className="mt-10 flex max-w-3xl flex-wrap gap-6">
        <div className="max-w-60">
          <p className="mb-2 font-bold">{"Who is watching?"}</p>
          <div className="flex flex-wrap gap-2">
            <Toggle variant="outline">{"User 1"}</Toggle>
            <Toggle variant="outline">{"User 2"}</Toggle>
            <Toggle variant="outline">{"User aaaaa"}</Toggle>
            <Toggle variant="outline">{"User Long name"}</Toggle>
          </div>
        </div>
        <div className="max-w-60">
          <p className="mb-2 font-bold">{"What genre?"}</p>
          <div className="flex flex-wrap gap-2">
            <Toggle variant="outline">
              <Image
                alt="ghost"
                width={16}
                height={16}
                src="/image/ghost.png"
              />
              {"Horror"}
            </Toggle>
            <Toggle variant="outline">{"Drama"}</Toggle>
            <Toggle variant="outline">{"Comedy"}</Toggle>
            <Toggle variant="outline">{"Thriller"}</Toggle>
          </div>
        </div>
        <div className="max-w-60">
          <p className="mb-2 font-bold">{"How long?"}</p>
          <div className="flex flex-wrap gap-2">
            <Toggle variant="outline">{"Any"}</Toggle>
            <Toggle variant="outline">
              <RiHourglassLine />
              {"< 1:40h"}
            </Toggle>
            <Toggle variant="outline">
              <RiHourglassFill />
              {"< 2h"}
            </Toggle>
          </div>
        </div>
      </div>
      {/*  results */}
      <PageDefaultContentWrapper className="mt-10 gap-3">
        {movies.results.map((movie) => (
          <MovieSearchCard key={movie.id} movie={movie} wantToSee={0} />
        ))}
      </PageDefaultContentWrapper>
    </div>
  );
};

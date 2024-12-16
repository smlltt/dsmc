import { MovieCard } from "@/components/molecules/movie-card";
import { ReactionOverview } from "@/components/molecules/movie-reaction-panel";
import { PageDefaultContentWrapper } from "@/components/molecules/page-default-content-wrapper";
import { ToggleFilter } from "@/components/molecules/toggle-filter";
import { searchMovies } from "@/lib/tmdb";
import Image from "next/image";

const WatchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    user: string[];
    genre: string[];
    maxRuntime: string[];
  }>;
}) => {
  const movies = await searchMovies("New york");

  const users = [
    { id: "1", label: "User 1" },
    { id: "2", label: "User 2" },
    { id: "3", label: "User aaaaa" },
    { id: "4", label: "User 2" },
    { id: "5", label: "User 2" },
    { id: "6", label: "User 2dadfsfd" },
  ];

  const genres = [
    {
      id: "1",
      label: (
        <>
          <Image alt="ghost" width={16} height={16} src="/image/ghost.png" />
          {"Horror"}
        </>
      ),
    },
    { id: "2", label: "Drama" },
    { id: "3", label: "Comedy" },
    { id: "4", label: "Thriller" },
  ];

  const maxRuntime = [
    { id: "1", label: "Any" },
    { id: "2", label: "< 1:40h" },
    { id: "3", label: "< 2h" },
  ];

  return (
    <>
      {/*  filters */}
      <div className="mt-10 flex flex-wrap gap-6">
        <div className="min-w-40 flex-1">
          <p className="mb-2 font-bold">{"Who is watching?"}</p>
          <ToggleFilter queryKey="user" items={users} />
        </div>
        <div className="min-w-40 flex-1">
          <p className="mb-2 font-bold">{"What genre?"}</p>
          <ToggleFilter queryKey="genre" items={genres} />
        </div>
        <div className="min-w-40 flex-1">
          <p className="mb-2 font-bold">{"How long?"}</p>
          <ToggleFilter queryKey="maxRuntime" items={maxRuntime} />
        </div>
      </div>
      {/*  results */}
      <PageDefaultContentWrapper className="mt-10 gap-3">
        {movies.results.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            reactionPanel={<ReactionOverview />}
          />
        ))}
      </PageDefaultContentWrapper>
    </>
  );
};

export default WatchPage;

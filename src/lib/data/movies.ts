import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 10;

export async function fetchMovies(page?: number) {
  const offset = (page || 1 - 1) * ITEMS_PER_PAGE;

  try {
    const movies = await prisma.movie.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: {
        //TODO to replace with date added
        release_date: "desc",
      },
    });
    console.log({ movies: movies[0] });
    const totalMovies = await prisma.movie.count();

    return {
      movies,
      totalMovies,
      totalPages: Math.ceil(totalMovies / ITEMS_PER_PAGE),
      currentPage: page,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch movies.");
  }
}

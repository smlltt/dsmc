import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 10;

export async function fetchMovies(page?: number) {
  const offset = ((page || 1) - 1) * ITEMS_PER_PAGE;

  try {
    const movies = await prisma.movie.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        genres: true,
        production_countries: true,
        crew_members: {
          include: {
            person: true,
          },
        },
        cast_members: {
          include: {
            person: true,
          },
        },
        movieReactions: true,
      },
    });
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

export async function fetchAllMovies() {
  try {
    return prisma.movie.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        genres: true,
        production_countries: true,
        crew_members: {
          include: {
            person: true,
          },
        },
        cast_members: {
          include: {
            person: true,
          },
        },
        movieReactions: true,
      },
    });
  } catch (error) {
    console.error("Database Error:", JSON.stringify(error));
    throw new Error("Failed to fetch movies.");
  }
}

export async function fetchFriendsMovies(page?: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Not allowed.");
  }

  const offset = ((page || 1) - 1) * ITEMS_PER_PAGE;

  try {
    const where = {
      userId: {
        not: userId,
      },
      OR: [
        {
          movieReactions: {
            none: {
              userId,
            },
          },
        },
        {
          movieReactions: {
            some: {
              userId,
              wantToSee: null,
              hasSeenMovie: {
                not: true,
              },
            },
          },
        },
      ],
    };

    const [count, results] = await Promise.all([
      prisma.movie.count({ where }),
      prisma.movie
        .findMany({
          skip: offset,
          take: ITEMS_PER_PAGE,
          orderBy: {
            createdAt: "desc",
          },
          where,
          include: {
            user: true,
            genres: true,
            production_countries: true,
            crew_members: {
              include: {
                person: true,
              },
            },
            cast_members: {
              include: {
                person: true,
              },
            },
            movieReactions: {
              where: {
                userId,
              },
            },
          },
        })
        .then((result) =>
          result.map((movie) => ({
            ...movie,
            myReaction: movie.movieReactions[0],
          })),
        ),
    ]);

    return {
      count,
      results,
      page,
      pageSize: ITEMS_PER_PAGE,
      totalPages: Math.ceil(count / ITEMS_PER_PAGE),
    };
  } catch (error) {
    console.error("Database Error:", JSON.stringify(error));
    throw new Error("Failed to fetch movies.");
  }
}

export const getReactions = async (movieTmdbIds: number[]) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return;
  }
  try {
    return prisma.movieReaction.findMany({
      where: {
        userId,
        movie: {
          tmdbId: {
            in: movieTmdbIds,
          },
        },
      },
      include: {
        movie: {
          select: {
            tmdbId: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Database Error:", JSON.stringify(error));
    throw new Error("Failed to fetch reactions.");
  }
};

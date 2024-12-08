"use server";

import { paths } from "@/lib/paths";

import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";
import { getMovieDetails } from "@/lib/tmdb";
import { revalidatePath } from "next/cache";

export const createMovie = async (id: number) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return;
  }
  const movie = await getMovieDetails(id);

  try {
    const movieExists = (await prisma.movie.findUnique({
      where: { tmdbId: id },
    })) as { id: string };
    //add reaction if movies exists
    if (movieExists) {
      await prisma.movieReaction.upsert({
        create: {
          movieId: movieExists.id,
          userId,
          wantToSee: 2,
        },
        update: {
          movieId: movieExists.id,
          userId,
          wantToSee: 2,
        },
        where: {
          movieId_userId: { movieId: movieExists.id, userId },
        },
      });
      revalidatePath(paths.allMovies);
      revalidatePath(paths.main);
      return { message: "Reaction added to existing movie" };
    }
    await prisma.movie.create({
      data: {
        tmdbId: id,
        backdrop_path: movie.backdrop_path || "",
        original_language: movie.original_language,
        original_title: movie.original_language,
        overview: movie.overview,
        imdb_id: movie.imdb_id,
        runtime: movie.runtime,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        status: movie.status,
        title: movie.title,
        vote_count: movie.vote_count,
        vote_average: movie.vote_average,
        production_countries: {
          connectOrCreate: movie.production_countries.map((country) => ({
            where: { iso_3166_1: country.iso_3166_1 },
            create: { iso_3166_1: country.iso_3166_1, name: country.name },
          })),
        },
        genres: {
          connectOrCreate: movie.genres.map((genre) => ({
            where: { tmdbId: genre.id },
            create: { tmdbId: genre.id, name: genre.name },
          })),
        },
        user: {
          connect: {
            id: userId,
          },
        },
        movieReactions: {
          create: {
            userId: userId,
            wantToSee: 2,
          },
        },
        crew_members: {
          connectOrCreate: movie.credits.crew
            .filter((c) => c.job === "Director")
            .map((c) => ({
              where: { credit_id: c.credit_id },
              create: {
                credit_id: c.credit_id,
                department: c.department,
                job: c.job,
                person: {
                  connectOrCreate: {
                    where: { tmdbId: c.id },
                    create: {
                      tmdbId: c.id,
                      adult: c.adult,
                      gender: c.gender,
                      known_for_department: c.known_for_department,
                      name: c.name,
                      original_name: c.original_name,
                      popularity: c.popularity,
                      profile_path: c.profile_path,
                    },
                  },
                },
              },
            })),
        },
        cast_members: {
          connectOrCreate: movie.credits.cast.slice(0, 10).map((c) => ({
            where: { credit_id: c.credit_id },
            create: {
              credit_id: c.credit_id,
              cast_id: c.cast_id,
              character: c.character,
              order: c.order,
              person: {
                connectOrCreate: {
                  where: { tmdbId: c.id },
                  create: {
                    tmdbId: c.id,
                    adult: c.adult,
                    gender: c.gender,
                    known_for_department: c.known_for_department,
                    name: c.name,
                    original_name: c.original_name,
                    popularity: c.popularity,
                    profile_path: c.profile_path,
                  },
                },
              },
            },
          })),
        },
      },
    });
    revalidatePath(paths.allMovies);
    revalidatePath(paths.main);
    return {
      message: "Movie added",
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to add movie.",
    };
  }
};

export const addOrUpdateReaction = async (
  movieId: string,
  wantToSee: number,
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return;
  }
  try {
    const movie = await prisma.movie.findUnique({ where: { id: movieId } });
    if (movie) {
      await prisma.movieReaction.upsert({
        create: {
          movieId: movie.id,
          userId,
          wantToSee,
        },
        update: {
          movieId: movie.id,
          userId,
          wantToSee,
        },
        where: {
          movieId_userId: { movieId: movie.id, userId },
        },
      });
      revalidatePath(paths.allMovies);
      revalidatePath(paths.main);
      return { message: "Reaction added" };
    }
  } catch (e) {
    return { message: "Reaction error" };
  }
};

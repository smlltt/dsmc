"use server";

import { paths } from "@/lib/paths";

import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";
import { getMovieDetails } from "@/lib/tmdb";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface IState {
  success: boolean;
  error?: string;
  message?: string;
}

export const createMovie = async (id: number) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return;
    }

    const movie = await getMovieDetails(id);

    const movieExists = await prisma.movie.findUnique({
      where: { tmdbId: id },
    });

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
      revalidatePath(paths.main);
      revalidatePath(paths.friendsMovies);

      return { success: true, message: "Reaction added to existing movie" };
    }

    await prisma.$transaction(async (tx) => {
      await tx.country.createMany({
        data: movie.production_countries.map((country) => ({
          iso_3166_1: country.iso_3166_1,
          name: country.name,
        })),
        skipDuplicates: true,
      });
      await tx.genre.createMany({
        data: movie.genres.map((genre) => ({
          tmdbId: genre.id,
          name: genre.name,
        })),
        skipDuplicates: true,
      });

      const createdMovie = await tx.movie.create({
        data: {
          tmdbId: id,
          backdrop_path: movie.backdrop_path,
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
          userId: userId,
          production_countries: {
            connect: movie.production_countries.map((country) => ({
              iso_3166_1: country.iso_3166_1,
            })),
          },
          genres: {
            connect: movie.genres.map((genre) => ({ tmdbId: genre.id })),
          },
          movieReactions: {
            create: {
              userId: userId,
              wantToSee: 2,
            },
          },
        },
      });

      const crewToAdd = movie.credits.crew.filter((c) => c.job === "Director");
      const castToAdd = movie.credits.cast.slice(0, 10);

      await tx.person.createMany({
        data: [...crewToAdd, ...castToAdd].map((c) => ({
          tmdbId: c.id,
          adult: c.adult,
          gender: c.gender,
          known_for_department: c.known_for_department,
          name: c.name,
          original_name: c.original_name,
          popularity: c.popularity,
          profile_path: c.profile_path,
        })),
        skipDuplicates: true,
      });
      const persons = await tx.person.findMany({
        where: {
          tmdbId: {
            in: [...crewToAdd.map((c) => c.id), ...castToAdd.map((c) => c.id)],
          },
        },
      });
      await tx.crewMember.createMany({
        data: crewToAdd.map((c) => ({
          credit_id: c.credit_id,
          department: c.department,
          job: c.job,
          movieId: createdMovie.id,
          personId: persons.find((p) => p.tmdbId === c.id)?.id as number,
        })),
      });
      await tx.castMember.createMany({
        data: castToAdd.map((c) => ({
          credit_id: c.credit_id,
          cast_id: c.cast_id,
          character: c.character,
          order: c.order,
          movieId: createdMovie.id,
          personId: persons.find((p) => p.tmdbId === c.id)?.id as number,
        })),
      });
    });

    // revalidatePath(paths.allMovies);
    revalidatePath(paths.main);
    revalidatePath(paths.friendsMovies);

    return {
      success: true,
      message: "Movie added",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      console.log(error.message);
    }
    return {
      success: false,
      error: "Failed to add movie.",
    };
  }
};

export interface AddOrUpdateReactionPayload {
  wantToSee?: number | null | undefined;
  hasSeenMovie?: boolean | null | undefined;
}

export const addOrUpdateReaction = async (
  movieId: string,
  payload: AddOrUpdateReactionPayload
) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return;
  }
  if (!(await prisma.movie.findUnique({ where: { id: movieId } }))) {
    return;
  }

  try {
    await prisma.movieReaction.upsert({
      create: {
        movieId,
        userId,
        ...payload,
      },
      update: {
        ...payload,
      },
      where: {
        movieId_userId: { movieId, userId },
      },
    });
    revalidatePath(paths.allMovies);
    revalidatePath(paths.main);
    revalidatePath(paths.friendsMovies);
    return { message: "Reaction added" };
  } catch (e) {
    console.error("Error adding/updating reaction:", JSON.stringify(e));
    return { message: "Reaction error" };
  }
};

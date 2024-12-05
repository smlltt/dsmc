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

  const {
    genres,
    backdrop_path,
    original_language,
    original_title,
    overview,
    imdb_id,
    runtime,
    popularity,
    poster_path,
    release_date,
    status,
    title,
    vote_count,
    vote_average,
    production_countries,
  } = movie;
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
      revalidatePath(paths.movies);
      revalidatePath(paths.main);
      return { message: "Reaction added to existing movie" };
    }
    await prisma.movie.create({
      data: {
        tmdbId: id,
        backdrop_path: backdrop_path || "",
        original_language,
        original_title,
        overview,
        imdb_id,
        runtime,
        popularity,
        poster_path,
        release_date,
        status,
        title,
        vote_count,
        vote_average,
        production_countries: {
          connectOrCreate: production_countries.map((country) => ({
            where: { iso_3166_1: country.iso_3166_1 },
            create: { iso_3166_1: country.iso_3166_1, name: country.name },
          })),
        },
        genres: {
          connectOrCreate: genres.map((genre) => ({
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
          connectOrCreate: movie.credits.crew.slice(0, 5).map((crew) => ({
            where: { tmdbId: crew.id },
            create: {
              tmdbId: crew.id,
              adult: crew.adult,
              gender: crew.gender,
              known_for_department: crew.known_for_department,
              name: crew.name,
              original_name: crew.original_name,
              popularity: crew.popularity,
              profile_path: crew.profile_path,
              credit_id: crew.credit_id,
              department: crew.department,
              job: crew.job,
            },
          })),
        },
        cast_members: {
          connectOrCreate: movie.credits.cast.slice(0, 5).map((cast) => ({
            where: { tmdbId: cast.id },
            create: {
              tmdbId: cast.id,
              adult: cast.adult,
              gender: cast.gender,
              known_for_department: cast.known_for_department,
              name: cast.name,
              original_name: cast.original_name,
              popularity: cast.popularity,
              profile_path: cast.profile_path,
              cast_id: cast.cast_id,
              character: cast.character,
              credit_id: cast.credit_id,
              order: cast.order,
            },
          })),
        },
      },
    });

    revalidatePath(paths.movies);
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

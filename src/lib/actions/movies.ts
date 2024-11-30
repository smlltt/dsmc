"use server";

import { paths } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { searchMovie } from "@/lib/tmdb";
import { revalidatePath } from "next/cache";
export const createMovie = async (id: number) => {
  const movie = await searchMovie(id);
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
    const movieExists = await prisma.movie.findUnique({
      where: { tmdbId: id },
    });
    //TODO replace this with reaction
    if (movieExists) {
      return { message: "Movie already in the list" };
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
            //TODO to be replaced with id of connected user
            id: 1,
          },
        },
      },
    });
    revalidatePath(paths.movies);
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

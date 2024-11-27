"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { searchMovie } from "@/lib/tmdb";
import { paths } from "@/lib/paths";
export const createMovie = async (id: number) => {
  const movie = await searchMovie(id);

  const {
    genres,
    adult,
    backdrop_path,
    original_language,
    original_title,
    overview,
    movieReactions,
    imdb_id,
    runtime,
    popularity,
    poster_path,
    release_date,
    status,
    title,
    video,
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
        adult,
        backdrop_path: backdrop_path || "",
        original_language,
        original_title,
        overview,
        movieReactions,
        imdb_id,
        runtime,
        popularity,
        poster_path,
        release_date,
        status,
        title,
        video,
        vote_count,
        vote_average,
        genre_ids: (genres as Array<{ id: number }>)?.map((genre) => genre.id),
        production_countries: {
          connectOrCreate: (
            production_countries as Array<{ iso_3166_1: string; name: string }>
          )?.map((country) => ({
            where: { iso_3166_1: country.iso_3166_1 },
            create: { iso_3166_1: country.iso_3166_1, name: country.name },
          })),
        },
        genres: {
          connectOrCreate: (genres as Array<{ id: number; name: string }>)?.map(
            (genre) => ({
              where: { id: genre.id },
              create: { id: genre.id, name: genre.name },
            }),
          ),
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

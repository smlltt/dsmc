"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { MovieSchema } from "@/lib/definitions";

export interface FormState {
  message: string;
}

export async function addMovie(prevState: FormState, formData: FormData) {
  const parsedData = MovieSchema.safeParse({
    id: Number(formData.get("id")),
    adult: formData.get("adult") === "true",
    backdrop_path: formData.get("backdrop_path"),
    genre_ids: formData
      .getAll("genre_ids")
      .flatMap((genre) =>
        typeof genre === "string" ? genre.split(",").map(Number) : [],
      ),
    original_language: formData.get("original_language"),
    original_title: formData.get("original_title"),
    overview: formData.get("overview"),
    popularity: parseFloat(formData.get("popularity") as string),
    poster_path: formData.get("poster_path"),
    release_date: formData.get("release_date"),
    title: formData.get("title"),
    video: formData.get("video") === "true",
    vote_average: parseFloat(formData.get("vote_average") as string),
    vote_count: parseInt(formData.get("vote_count") as string, 10),
    aga: formData.get("aga"),
    zachariasz: formData.get("zachariasz"),
    samuel: formData.get("samuel"),
  });

  if (!parsedData.success) {
    console.log({ parsedDataError: parsedData.error.message });
    return {
      message: "Failed to add movie",
    };
  }

  const {
    id,
    adult,
    backdrop_path,
    genre_ids,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
    aga,
    zachariasz,
    samuel,
  } = parsedData.data;

  try {
    //TODO check if ok
    // const moviesExists = await prisma.movie.findUnique({ where: { id } });
    // if (moviesExists) {
    //   return { message: "Movie already in the list" };
    // }
    await prisma.movie.create({
      data: {
        id,
        adult,
        backdrop_path,
        genre_ids,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        vote_count,
        aga,
        zachariasz,
        samuel,
      },
    });
    return {
      message: "Movie added",
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to add movie.",
    };
  }
  //TODO replace with route
  revalidatePath("/movies");
}

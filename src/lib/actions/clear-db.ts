"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { paths } from "../paths";

export const clearDB = async () => {
  const session = await auth();
  if (!session?.user) {
    return;
  }

  try {
    await prisma.$transaction([
      prisma.movieReaction.deleteMany(),
      prisma.genre.deleteMany(),
      prisma.castMember.deleteMany(),
      prisma.crewMember.deleteMany(),
      prisma.country.deleteMany(),
      prisma.person.deleteMany(),
      prisma.movie.deleteMany(),
    ]);

    revalidatePath(paths.main);
    revalidatePath(paths.allMovies);
  } catch (error) {
    console.error("Database Error:", error);
  }
};

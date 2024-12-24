"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { paths } from "../paths";

export const clearDB = async () => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

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
    revalidatePath(paths.friendsMovies);
  } catch (error) {
    console.error("Database Error:", error);
  }
};

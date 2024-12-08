import { prisma } from "@/lib/prisma";

export async function fetchUsersCount() {
  return prisma.user.count();
}

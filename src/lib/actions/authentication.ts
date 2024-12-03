"use server";

import { signIn } from "@/auth";

export async function login(): Promise<{ message: string }> {
  await signIn("google");
  return { message: "success" };
}

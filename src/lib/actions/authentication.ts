"use server";

import { signIn } from "@/auth";

export async function login() {
  // try {
  await signIn("google");

  //TODO this is not working -> check why
  // } catch (e) {
  //   console.log("error test", e);
  //   return { message: "Something went wrong" };
  // }
}

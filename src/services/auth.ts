"use server";
import { auth } from "@/auth";

export async function getUser() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    throw new Error("Ups! Error validating user. Please Login", {
      cause: "auth",
    });
  }
  return user;
}

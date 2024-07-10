"use server";
import { auth } from "@/auth";

export async function getUser() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return null;
  }
  return user;
}

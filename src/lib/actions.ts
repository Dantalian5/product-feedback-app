"use server";
import { signIn, signOut } from "@/auth";

export const logIn = async (formData: any) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    console.error(error);
  }
};
export const logOut = async () => {
  console.log("Log Out");
  await signOut();
};

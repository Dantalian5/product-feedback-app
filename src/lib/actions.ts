// "use server";
// import { signIn, signOut } from "@/auth";
// import { redirect } from "next/navigation";

// export const logIn = async (formData: any, callbackUrl: any) => {
//   try {
//     const res = await signIn("credentials", {
//       redirect: false,
//       email: formData.email,
//       password: formData.password,
//       redirectTo: callbackUrl,
//     });
//     redirect(callbackUrl);
//   } catch {
//     console.log("Error");
//   }
// };
// export const logOut = async () => {
//   console.log("Log Out");
//   await signOut();
// };

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/types/signinSchema";

async function getUser(email: string): Promise<any> {
  return {
    id: 1,
    image: "./assets/user-images/image-zena.jpg",
    name: "Zena Kelley",
    username: "velvetround",
    email: test,
    password: test,
  };
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials: any) => {
        let user = null;
        const { email, password } = credentials;
        user = await getUser(email);
        console.log(user);
        if (!user || user.password !== password) {
          return null;
        }

        return user;
      },
    }),
  ],
});

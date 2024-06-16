import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/types/signinSchema";
import type { Provider } from "next-auth/providers";

async function getUser(email: string): Promise<any> {
  return {
    id: 1,
    image: "./assets/user-images/image-zena.jpg",
    name: "Zena Kelley",
    username: "velvetround",
    email: "test",
    password: "test",
  };
}

const providers: Provider[] = [
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "email", type: "text" },
      password: { label: "password", type: "password" },
    },
    authorize: async (credentials: any) => {
      console.log("auth Fn");
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
];
export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("auth callback");
      const isLoggedIn = !!auth?.user;
      const paths = ["/roadmap"];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );
      console.log(isProtected, isLoggedIn);

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/login", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }
      return true;
    },
    // Other code below
  },
});

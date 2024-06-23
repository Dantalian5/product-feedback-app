import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

async function getUser(email: string): Promise<any> {
  return {
    id: 1,
    image: "/assets/user-images/image-zena.jpg",
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
      let user = null;
      const { email, password } = credentials;
      user = await getUser(email);
      if (!user || user.password !== password) {
        return null;
      }
      return {
        id: user.id,
        image: user.image,
        name: user.name,
        username: user.username,
      };
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
  session: { strategy: "jwt" },
  providers,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/protected", "/new", "/edit"];
      const isProtected = paths.some((path) => nextUrl.pathname.endsWith(path));

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/login", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }
      return true;
    },
    jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.image = user.image;
      }
      return token;
    },
    session({ session, token }: any) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.image = token.image;
      return session;
    },
  },
});

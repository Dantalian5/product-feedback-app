import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/protected", "/new", "/edit", "/settings"];
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
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }: any) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.image = token.image;
      session.user.email = token.email;
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});

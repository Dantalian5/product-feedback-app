import NextAuth from "next-auth";
// importing providers
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [],
});

export { handler as GET, handler as POST };

import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/schemas/loginSchema";
import { getUserByEmail } from "@/services/actions/userActions";
import prisma from "@/lib/prismaDB";

export default {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = loginSchema.parse(credentials);

        const user = await getUserByEmail(email);

        if (!user || !user.password || user.password === "") return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch)
          return {
            id: user.id,
            image: user.image,
            name: user.name,
            username: user.username,
            email: user.email,
          };
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

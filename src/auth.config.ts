import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/schemas/loginSchema";

async function getUser(email: string): Promise<any> {
  return {
    id: 1,
    image: "/assets/user-images/image-zena.jpg",
    name: "Zena Kelley",
    username: "velvetround",
    email: "test",
    password: "$2a$12$o2/dnAN5cNzAo4LpYPON9.IzPwhF4ATIYIxoysjYpzB5R2S41V0t2",
  };
}

const prisma = new PrismaClient();
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

        const user = await prisma.users.findUnique({
          where: {
            email: email, // Reemplaza con un email válido en tu base de datos
          },
        });

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

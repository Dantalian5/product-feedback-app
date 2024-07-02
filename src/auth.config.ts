import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
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

import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432,
});

// export async function getUserByEmail(email: string) {
//   const query = `SELECT
//     users.name,
//     users.username,
//     users.email,
//     users.image,
//     users.password
//     FROM users
//     WHERE users.email = $1;`;

//   try {
//     const client = await pool.connect();
//     const result = await client.query(query, [email]);
//     client.release();
//     return result.rows[0];
//   } catch (error) {
//     throw new Error("Error fetching user from db");
//   }
// }

export default {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = loginSchema.parse(credentials);

        const user = await getUser(email);
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

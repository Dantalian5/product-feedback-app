import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function main() {
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    // Utiliza findUnique para buscar un usuario por email
    const user = await prisma.users.findUnique({
      where: {
        email: "test@email.com", // Reemplaza con un email válido en tu base de datos
      },
    });
    console.log("User:", user);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

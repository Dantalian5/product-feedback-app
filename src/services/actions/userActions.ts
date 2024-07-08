"use server";
import prisma from "@/lib/prismaDB";
import { ZodError } from "zod";
import { hash } from "bcryptjs";
import {
  registerUserSchema,
  type RegisterUserSchema,
  userSchema,
  type UserSchema,
} from "@/schemas/userSchema";
import { getUser } from "@/services/auth";

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user from db");
  }
}
export async function addUserToDb(user: RegisterUserSchema) {
  try {
    const { name, username, email, password } = registerUserSchema.parse(user);
    const hashedPassword = await hash(password, 12);
    const newUser = await prisma.users.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });
    return { status: 201, user: newUser };
  } catch (error: any) {
    if (error instanceof ZodError) {
      return { status: 400, errorList: error.errors };
    }
    if (error.code === "P2002") {
      return { status: 409 };
    }
    return { status: 500 };
  }
}
export async function updateUserData(data: UserSchema) {
  try {
    const user = await getUser();
    const updatedUser = await prisma.users.update({
      where: { id: Number(user.id) },
      data: data,
    });

    return { status: 200, user: updatedUser };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { status: 409, message: "User with that email already exists" };
    }
    return { status: 500, message: "Internal Server Error" };
  }
}

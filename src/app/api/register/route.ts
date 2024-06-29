import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { addUser } from "@/services/api";
import { registerUserSchema } from "@/schemas/userSchema";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const { name, username, email, password } = registerUserSchema.parse(
      await req.json(),
    );
    const hashedPassword = await hash(password, 12);
    const user = await addUser({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        user: {
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 },
      );
    }
    if (error.cause === "23505") {
      return NextResponse.json(
        {
          status: "fail",
          message: "user with that email already exists",
        },
        { status: 409 },
      );
    }
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

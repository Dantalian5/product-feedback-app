"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { authenticate } from "@/lib/actions";
import Button from "@/components/common/Button";

const SignIn = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  const formData = {
    email: "test",
    password: "test",
  };
  return (
    <section className="flex h-full w-full items-center justify-center">
      <form
        action={() => {
          signIn("credentials", formData);
        }}
        className="relative mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-6 rounded-10 bg-white p-6 sm:p-10"
      >
        <label className="text-dark-700 flex w-full flex-col gap-2 text-base font-bold">
          Email
          <input
            type="text"
            name="email"
            placeholder="example@email.com"
            required
            className="custom-form-focus sm:text-md text-dark-700 placeholder:text-dark-700/60 block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal sm:px-6"
          />
        </label>
        <label className="text-dark-700 flex w-full flex-col gap-2 text-base font-bold">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="custom-form-focus sm:text-md text-dark-700 placeholder:text-dark-700/60 block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal sm:px-6"
          />
        </label>

        <div>{errorMessage && <p>{errorMessage}</p>}</div>
        <Button aria-disabled={pending} type="submit" classe="blue">
          Login
        </Button>
      </form>
    </section>
  );
};

export default SignIn;

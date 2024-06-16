"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { logIn } from "@/lib/actions";
import Button from "@/components/common/Button";

const SignIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const formData = {
    email: "test",
    password: "test",
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
      redirectTo: callbackUrl,
    });
    router.push(callbackUrl);
  };
  console.log(callbackUrl);
  return (
    <section className="flex h-full w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-6 rounded-10 bg-white p-6 sm:p-10"
      >
        <label className="flex w-full flex-col gap-2 text-base font-bold text-dark-700">
          Email
          <input
            type="text"
            name="email"
            placeholder="example@email.com"
            required
            className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
          />
        </label>
        <label className="flex w-full flex-col gap-2 text-base font-bold text-dark-700">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
          />
        </label>
        <Button type="submit" classe="blue">
          Login
        </Button>
      </form>
    </section>
  );
};

export default SignIn;

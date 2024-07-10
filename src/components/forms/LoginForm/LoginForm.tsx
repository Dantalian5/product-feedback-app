"use client";
import React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/common/Button";
import CustomLabel from "@/components/common/CustomLabel";

type Inputs = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();
  const inputMailId = React.useId();
  const inputPasswordId = React.useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        redirectTo: callbackUrl,
      });
      if (!res?.error) {
        toast.success("Successfully logged in");
        router.push(callbackUrl);
      } else {
        toast.error("Invalid email or password");
        reset({ password: "" });
      }
    } catch (error) {
      toast.error("Oops, something went wrong. Try again later");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mx-auto flex w-full flex-col items-center justify-center gap-6 rounded-10 bg-white px-6 pb-6 pt-20 sm:px-10 sm:pb-10"
    >
      <CustomLabel label="Email" htmlFor={inputMailId}>
        <input
          id={inputMailId}
          type="text"
          {...register("email")}
          placeholder="example@email.com"
          required
          className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
        />
      </CustomLabel>
      <CustomLabel label="Password" htmlFor={inputPasswordId}>
        <input
          id={inputPasswordId}
          type="password"
          {...register("password")}
          placeholder="Password"
          required
          className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
        />
      </CustomLabel>
      <Button type="submit" classe="blue">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;

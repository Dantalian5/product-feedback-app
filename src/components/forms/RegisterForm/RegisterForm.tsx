"use client";
import React from "react";

import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/common/Button";
import CustomLabel from "@/components/common/CustomLabel";
import { addUserToDb } from "@/services/actions/userActions";
import { type RegisterUserSchema } from "@/schemas/userSchema";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const { register, handleSubmit, reset } = useForm<RegisterUserSchema>();

  const onSubmit: SubmitHandler<RegisterUserSchema> = async (data) => {
    try {
      const res = await addUserToDb(data);
      switch (res.status) {
        case 201:
          toast.success("User created successfully");
          setErrors({});
          reset();
          router.push("/login");
          break;
        case 400:
          toast.error("Please fill in all the fields correctly");
          const fieldErrors: { [key: string]: string } = {};
          res.errorList?.forEach((err: any) => {
            if (err.path.length > 0) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          break;
        case 409:
          toast.error("User with that email already exists");
          setErrors({ email: "User with that email already exists" });
          break;
        case 500:
          toast.error("Internal server error. Please try again later");
          break;
        default:
          toast.error("Oops, something went wrong. Try again later");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mx-auto flex w-full flex-col items-center justify-center gap-6 rounded-10 bg-white px-6 pb-6 pt-20 sm:px-10 sm:pb-10"
    >
      <CustomLabel label="Name" htmlFor={"name"} error={errors.name}>
        <input
          id={"name"}
          type="text"
          {...register("name")}
          placeholder="John Doe"
          className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
        />
      </CustomLabel>
      <CustomLabel
        label="Username"
        htmlFor={"username"}
        error={errors.username}
      >
        <input
          id={"username"}
          type="text"
          {...register("username")}
          placeholder="john_doe"
          className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
        />
      </CustomLabel>
      <CustomLabel label="Email" htmlFor={"mail"} error={errors.email}>
        <input
          id={"mail"}
          type="mail"
          {...register("email")}
          placeholder="example@email.com"
          className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
        />
      </CustomLabel>
      <CustomLabel
        label="Password"
        htmlFor={"password"}
        error={errors.password}
      >
        <input
          id={"password"}
          type="password"
          {...register("password")}
          className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
        />
      </CustomLabel>
      <CustomLabel
        label="Confirm Password"
        htmlFor={"confirmPassword"}
        error={errors.confirmPassword}
      >
        <input
          id={"confirmPassword"}
          type="password"
          {...register("confirmPassword")}
          className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
        />
      </CustomLabel>
      <span className="gap-2 text-center text-xs text-orange-200">
        <svg
          className="mb-1 mr-2 inline-block "
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-4v4m0 4h.01"
          ></path>
        </svg>
        This project is for educational and demonstrative purposes only. Feel
        free to use fake email addresses and data, as they will not be verified
        or shared.
      </span>
      <Button type="submit" classe="blue">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;

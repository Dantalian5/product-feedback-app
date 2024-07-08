"use client";
import React from "react";

import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import CustomLabel from "@/components/common/CustomLabel";
import { userSchema, UserSchema } from "@/schemas/userSchema";
import { updateUserData } from "@/services/actions/userActions";
import type { User } from "@/types/global";

const UserPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
    },
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    try {
      const res = await updateUserData(data);
      toast.success("Reply added successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <form
      id="userForm"
      className="relative rounded-10 bg-white px-6 pb-6 pt-11 sm:px-10 sm:pb-10 sm:pt-[52px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-8 flex flex-col gap-y-6">
        <CustomLabel
          label="Name"
          htmlFor="inputName"
          error={errors.name?.message}
        >
          <input
            id="inputName"
            type="text"
            {...register("name")}
            className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
          />
        </CustomLabel>
        <CustomLabel
          label="Username"
          htmlFor="inputUsername"
          error={errors.username?.message}
        >
          <input
            id="inputUsername"
            type="text"
            {...register("username")}
            className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
          />
        </CustomLabel>
        <CustomLabel
          label="Email"
          htmlFor="inputEmail"
          error={errors.email?.message}
        >
          <input
            id="inputEmail"
            type="text"
            {...register("email")}
            className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
          />
        </CustomLabel>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row-reverse">
        <Button classe="violet" type="submit" isFlex>
          Save Changes
        </Button>
        <Button classe="dark" type="button" isFlex>
          Cancel
        </Button>
        <div className="w-full">
          <Button classe="orange" type="button" isFlex>
            Delete User
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserPassword;

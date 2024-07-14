"use client";
import React from "react";

import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import CustomLabel from "@/components/common/CustomLabel";
import { updateUserPass, type UpdateUserPass } from "@/schemas/userSchema";
import { updateUserPassword } from "@/services/actions/userActions";

const UserPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserPass>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(updateUserPass),
  });

  const onSubmit: SubmitHandler<UpdateUserPass> = async (data) => {
    try {
      const res = await updateUserPassword(data);
      switch (res.status) {
        case 201:
          toast.success("Password Updated");
          router.refresh();
          break;
        case 401:
          toast.error("Incorrect password");
          break;
        case 404:
          toast.error("User not found");
          break;
        case 500:
          toast.error("Internal server error. Please try again later");
          break;
        default:
          toast.error("Oops, something went wrong. Please, try again later");
      }
    } catch (error: any) {
      toast.error("Oops, something went wrong. Try again later");
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
          label="Old Password"
          htmlFor="oldPassword"
          error={errors.oldPassword?.message}
        >
          <input
            id="oldPassword"
            type="text"
            {...register("oldPassword")}
            className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
          />
        </CustomLabel>
        <CustomLabel
          label="New Password"
          htmlFor="newPassword"
          error={errors.newPassword?.message}
        >
          <input
            id="newPassword"
            type="text"
            {...register("newPassword")}
            className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
          />
        </CustomLabel>
        <CustomLabel
          label="Confirm New Password"
          htmlFor="confirmNewPassword"
          error={errors.confirmNewPassword?.message}
        >
          <input
            id="confirmNewPassword"
            type="text"
            {...register("confirmNewPassword")}
            className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
          />
        </CustomLabel>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row-reverse">
        <Button classe="violet" type="submit" isFlex>
          Change Password
        </Button>
        <Button classe="dark" type="button" isFlex>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UserPassword;

"use client";
import React from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/common/Button";
import { addComment } from "@/services/api";
import { commentSchema, CommentSchema } from "@/schemas/commentSchema";
import { useUser } from "@/components/context/UserProvider";

interface AddCommentProps {
  feedbackId: number;
}
const AddComment = ({ feedbackId }: AddCommentProps) => {
  const router = useRouter();
  const user = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
  });

  const content = watch("content") || "";
  const remaining = 250 - content.length;

  const onSubmit: SubmitHandler<CommentSchema> = async (data) => {
    try {
      await addComment({
        feedback_id: feedbackId,
        parent_id: null,
        content: data.content,
      });
      toast.success("Comment added successfully");
      reset();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form
      id={"addCommentForm"}
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full rounded-10 bg-white p-6 sm:px-8 sm:pb-8 ${!user && " *:opacity-70"}`}
    >
      {!user && (
        <span className="mb-4 block text-sm font-normal text-orange-200">
          You must be logged in to comment
        </span>
      )}
      <label
        htmlFor={"content"}
        className="mb-6 block text-lg font-bold tracking-tighter text-dark-700"
      >
        Add Comment
      </label>
      <div className="mb-4 w-full">
        <textarea
          className={`${errors.content && "border border-orange-200"} custom-form-focus block w-full rounded-5 bg-dark-200 p-4 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md`}
          id={"content"}
          {...register("content")}
          rows={2}
          maxLength={250}
          disabled={!user}
          placeholder="Type your comment here"
          aria-label="Type your comment here"
        />
        {errors.content?.message && (
          <p className="mt-1 text-sm text-orange-200">
            {errors.content?.message}
          </p>
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <p className=" text-xs font-normal text-dark-600 sm:text-md">
          {remaining} Characters left
        </p>
        <Button type="submit" classe="violet" disabled={!user}>
          Post Comment
        </Button>
      </div>
    </form>
  );
};

export default AddComment;

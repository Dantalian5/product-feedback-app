"use client";
import React from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/common/Button";
import { addComment } from "@/services/api";
import { commentSchema, CommentSchema } from "@/schemas/commentSchema";
import type { TypeUser } from "@/types/dataTypes";
interface AddReplyProps {
  feedbackId: number;
  user: TypeUser | null;
  commentId: number;
}
const AddReply = ({ feedbackId, user, commentId, ...rest }: AddReplyProps) => {
  const router = useRouter();
  const formId = React.useId();
  const inputId = React.useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit: SubmitHandler<CommentSchema> = async (data) => {
    try {
      await addComment({
        id: 0,
        feedback_id: feedbackId,
        content: data.content,
        user: user?.id as number,
        replying_to: commentId,
      });
      toast.success("Reply added successfully");
      reset();
      router.refresh();
    } catch (error) {
      toast.error("Oops, something went wrong. Try again later");
    }
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-start gap-x-4 rounded-10 bg-white sm:flex-row"
      {...rest}
    >
      <div className="mb-4 w-full flex-grow">
        <textarea
          className={`${errors.content && "border border-orange-200"} custom-form-focus block w-full rounded-5 bg-dark-200 p-4 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md`}
          id={inputId}
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
      <div className="ml-auto w-fit">
        <Button type="submit" classe="violet">
          Post Reply
        </Button>
      </div>
    </form>
  );
};

export default AddReply;

"use client";
import React from "react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addComment } from "@/services/api";
import TextArea from "@/components/common/TextArea";
import { TypeComment, type TypeUser } from "@/types/dataTypes";
import { z } from "zod";

interface AddCommentProps {
  feedbackId: number;
  user: TypeUser | null;
}
const commentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Can't be empty" })
    .max(250, { message: "Content must be at most 250 characters long" }),
});
const AddComment = (props: AddCommentProps) => {
  const router = useRouter();
  const { feedbackId, user } = props;
  const formId = React.useId();
  const inputId = React.useId();
  const [content, setContent] = React.useState("");
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const remaining = 250 - content.length;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      commentSchema.parse({ content });
      const result = await addComment({
        id: 0,
        feedback_id: feedbackId,
        content: content,
        user: user?.id as number,
        replying_to: null,
      });
      toast.success(`Comment added successfully`);
      router.refresh();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error adding comment:", error);
        toast.error("Ups, something whent wrong. Try again later");
      }
    }
  };
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    errors.content && setErrors({});
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className={`w-full rounded-10 bg-white p-6 sm:px-8 sm:pb-8 ${!user && " *:opacity-70"}`}
    >
      {!user && (
        <span className="mb-4 block text-sm font-normal text-orange-200">
          You must be logged in to comment
        </span>
      )}
      <label
        htmlFor={inputId}
        className="mb-6 block text-lg font-bold tracking-tighter text-dark-700"
      >
        Add Comment
      </label>
      <div className="mb-4 w-full">
        <TextArea
          id={inputId}
          value={content}
          onChange={handleInput}
          error={errors.content}
          rows={2}
          maxLength={250}
          disabled={!user}
          placeholder="Type your comment here"
        />
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

"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import toast from "react-hot-toast";

import Button from "@/components/common/Button";
import TextArea from "@/components/common/TextArea";
import { addComment } from "@/services/api";
import { commentSchema } from "@/schemas/commentSchema";
import type { TypeUser } from "@/types/dataTypes";
interface AddReplyProps {
  feedbackId: number;
  user: TypeUser | null;
  commentId: number;
}
const AddReply = ({ feedbackId, user, commentId }: AddReplyProps) => {
  const router = useRouter();
  const formId = React.useId();
  const inputId = React.useId();
  const [content, setContent] = React.useState<string>("");
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      commentSchema.parse({ content });
      const result = await addComment({
        id: 0,
        feedback_id: feedbackId,
        content: content,
        user: user?.id as number,
        replying_to: commentId,
      });
      toast.success(`Reply added successfully`);
      router.refresh();
    } catch (error) {
      if (error instanceof ZodError) {
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
      className="flex w-full flex-col items-start gap-x-4 rounded-10 bg-white sm:flex-row"
    >
      <div className="mb-4 w-full flex-grow">
        <TextArea
          id={inputId}
          value={content}
          rows={2}
          onChange={handleInput}
          placeholder="Type your comment here"
          maxLength={250}
          aria-label="reply to comment"
        />
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

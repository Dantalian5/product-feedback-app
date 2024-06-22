"use client";
import React from "react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addComment } from "@/services/api";
import type { TypeUser } from "@/types/dataTypes";

interface AddReplyProps {
  feedbackId: number;
  user: TypeUser | null;
  commentId: number;
}
const AddReply = (props: AddReplyProps) => {
  const router = useRouter();
  const { feedbackId, user, commentId } = props;
  const formId = React.useId();
  const inputId = React.useId();
  const [content, setContent] = React.useState<string>("");
  const [isError, setIsError] = React.useState<boolean>(false);

  console.log(props);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() !== "") {
      try {
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
        console.error("Error adding comment:", error);
        toast.error("Ups, something whent wrong. Try again later");
      }
    } else {
      setIsError(true);
    }
  };
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    isError && setIsError(false);
  };
  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-start gap-x-4 rounded-10 bg-white sm:flex-row"
    >
      <div className="mb-4 w-full flex-grow">
        <textarea
          form={formId}
          id={inputId}
          className={`block min-h-20 w-full resize-none rounded-5 bg-dark-200 p-4 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 focus:outline-1 focus:outline-blue-200 sm:text-md ${
            isError ? "border border-orange-200" : ""
          }`}
          value={content}
          rows={2}
          onChange={handleInput}
          placeholder="Type your comment here"
          maxLength={250}
          aria-label="reply to comment"
        />
        {isError && (
          <p className="mt-1 text-sm font-normal text-orange-200">
            Can’t be empty
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

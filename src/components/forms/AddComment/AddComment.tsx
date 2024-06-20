"use client";
import React from "react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addComment } from "@/services/api";
import { TypeCommentWithId, type TypeUser } from "@/types/dataTypes";

interface AddCommentProps {
  feedbackId: number;
  user: TypeUser | null;
}
const AddComment = (props: AddCommentProps) => {
  const router = useRouter();
  const { feedbackId, user } = props;
  const formId = React.useId();
  const inputId = React.useId();
  const [isError, setIsError] = React.useState<boolean>(false);
  const [content, setContent] = React.useState("");

  const remaining = 250 - content.length;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() !== "") {
      try {
        const result = await addComment({
          id: 0,
          feedback_id: feedbackId,
          content: content,
          user_id: user?.id as number,
        });
        toast.success(`Feedback deleted successfully`);
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
        <textarea
          form={formId}
          id={inputId}
          className={`block min-h-20 w-full resize-none rounded-5 bg-dark-200 p-4 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 focus:outline-1 focus:outline-blue-200 sm:px-6 sm:text-md ${
            isError ? "border border-orange-200" : ""
          }`}
          value={content}
          rows={2}
          onChange={handleInput}
          placeholder="Type your comment here"
          maxLength={250}
          disabled={!user}
        />
        {isError && (
          <p className="mt-1 text-sm font-normal text-orange-200">
            Can’t be empty
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

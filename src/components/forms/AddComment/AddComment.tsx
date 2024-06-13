"use client";
import React from "react";
import Button from "@/components/common/Button";

export type AddCommentProps = {
  requestId: number;
};
const AddComment = (props: AddCommentProps) => {
  const { requestId } = props;
  const formId = React.useId();
  const inputId = React.useId();
  const [content, setContent] = React.useState<string>("");
  const [isError, setIsError] = React.useState<boolean>(false);

  const remaining = 250 - content.length;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = {
      content: content,
      request_id: requestId,
    };
    if (content.trim() !== "") {
      console.log("submit comment");
      setContent("");
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
      className=" w-full rounded-10 bg-white p-6 sm:px-8 sm:pb-8"
    >
      <label
        htmlFor={inputId}
        className="text-dark-700 mb-6 block text-lg font-bold tracking-tighter"
      >
        Add Comment
      </label>
      <div className="mb-4 w-full">
        <textarea
          form={formId}
          id={inputId}
          className={`sm:text-md text-dark-700 placeholder:text-dark-700/60 block min-h-20 w-full resize-none rounded-5 bg-dark-200 p-4 text-xs font-normal focus:outline-1 focus:outline-blue-200 sm:px-6 ${
            isError ? "border border-orange-200" : ""
          }`}
          value={content}
          rows={2}
          onChange={handleInput}
          placeholder="Type your comment here"
          maxLength={250}
        />
        {isError && (
          <p className="mt-1 text-sm font-normal text-orange-200">
            Can’t be empty
          </p>
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <p className=" sm:text-md text-dark-600 text-xs font-normal">
          {remaining} Characters left
        </p>
        <Button type="submit" classe="violet">
          Post Comment
        </Button>
      </div>
    </form>
  );
};

export default AddComment;

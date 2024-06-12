"use client";
import React from "react";
import Button from "@/components/common/Button";

const AddReply = (props: any) => {
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
      console.log("submit form with data:", comment);
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
      className="flex w-full flex-col items-start gap-x-4 rounded-10 bg-white sm:flex-row"
    >
      <div className="mb-4 w-full flex-grow">
        <textarea
          form={formId}
          id={inputId}
          className={`block min-h-20 w-full resize-none rounded-5 bg-gray-200 p-4 text-13 font-normal text-dark-200 placeholder:text-dark-200/60 focus:outline-1 focus:outline-blue-200 sm:text-15 ${
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
        <Button type="submit" color="violet">
          Post Reply
        </Button>
      </div>
    </form>
  );
};

export default AddReply;

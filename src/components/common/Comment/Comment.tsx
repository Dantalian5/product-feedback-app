"use client";
import React from "react";
import Image from "next/image";
import AddReply from "@/components/forms/AddReply";
import type { TypeUser } from "@/types/dataTypes";

interface CommentProps {
  id: number;
  feedbackId: number;
  user: TypeUser;
  content: string;
  replying_to: TypeUser | null;
}
const Comment = (props: CommentProps) => {
  const { id, feedbackId, user, content, replying_to } = props;
  const [reply, setReply] = React.useState<boolean>(false);

  return (
    <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-x-8">
      <Image
        src={user.image}
        alt={user.name}
        width={40}
        height={40}
        className=" col-start-1 row-start-1 w-fit rounded-full"
      />
      <div className="col-start-2 row-start-1 flex w-full flex-col">
        <p className="text-xs font-bold text-dark-700 sm:text-sm">
          {user.name}
        </p>
        <p className="text-xs font-normal text-dark-600 sm:text-sm">
          @{user.username}
        </p>
      </div>
      <button
        className="col-start-3 row-start-1 w-fit text-xs font-semibold text-blue-200"
        onClick={() => setReply((prev) => !prev)}
      >
        Reply
      </button>
      <p className="col-span-3 col-start-1 row-start-2 overflow-hidden text-ellipsis text-xs font-normal text-dark-600 sm:col-span-2 sm:col-start-2 sm:text-md">
        {replying_to && (
          <span className="text-xs text-violet-200">
            @{replying_to?.username}{" "}
          </span>
        )}
        {content}
      </p>
      {reply && (
        <div className="col-span-3 col-start-1 row-start-3 pt-2 sm:col-span-2 sm:col-start-2">
          <AddReply feedbackId={feedbackId} user={user} commentId={id} />
        </div>
      )}
    </div>
  );
};

export default Comment;

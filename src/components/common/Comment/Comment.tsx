"use client";
import React from "react";
import Image from "next/image";
import AddReply from "@/components/forms/AddReply";
import type { TypeUser } from "@/types/dataTypes";

interface CommentProps {
  user: TypeUser;
  content: string;
  replying_to: TypeUser | null;
}
const Comment = (props: CommentProps) => {
  const { user, content, replying_to } = props;
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
        <p className="text-dark-700 text-xs font-bold sm:text-sm">
          {user.name}
        </p>
        <p className="text-dark-600 text-xs font-normal sm:text-sm">
          @{user.username}
        </p>
      </div>
      <button
        className="col-start-3 row-start-1 w-fit text-xs font-semibold text-blue-200"
        onClick={() => setReply((prev) => !prev)}
      >
        Reply
      </button>
      <p className="sm:text-md text-dark-600 col-span-3 col-start-1 row-start-2 text-xs font-normal sm:col-span-2 sm:col-start-2">
        {replying_to && (
          <span className="text-violet-200 text-xs">
            @{replying_to?.username}{" "}
          </span>
        )}
        {content}
      </p>
      {reply && (
        <div className="col-span-3 col-start-1 row-start-3 pt-2 sm:col-span-2 sm:col-start-2">
          <AddReply />
        </div>
      )}
    </div>
  );
};

export default Comment;

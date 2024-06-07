"use client";
import React from "react";
import Image from "next/image";
import AddReply from "@/components/forms/AddReply";
import type { UserType } from "@/types/dataTypes";

interface CommentProps {
  user: UserType;
  content: string;
  replying_to: UserType | null;
}
const Comment = (props: CommentProps) => {
  const { user, content, replying_to } = props;
  const [reply, setReply] = React.useState<boolean>(false);

  return (
    <div>
      <div className="mb-4 flex items-center gap-x-4">
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className=" rounded-full"
        />
        <div>
          <p className="text-13 font-bold text-dark-200">{user.name}</p>
          <p className="text-13 font-normal text-dark-100">@{user.username}</p>
        </div>
        <button
          className="ml-auto text-13 font-semibold text-violet"
          onClick={() => setReply((prev) => !prev)}
        >
          Reply
        </button>
      </div>

      <p className="text-13 font-normal text-dark-100">
        {replying_to && (
          <span className="text-13 text-violet">@{replying_to?.username} </span>
        )}
        {content}
      </p>
      {reply && <AddReply />}
    </div>
  );
};

export default Comment;

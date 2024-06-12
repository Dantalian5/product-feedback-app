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
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-x-8">
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className=" col-start-1 row-start-1 w-fit rounded-full"
        />
        <div className="col-start-2 row-start-1 flex w-full flex-col">
          <p className="text-13 font-bold text-dark-200 sm:text-sm">
            {user.name}
          </p>
          <p className="text-13 font-normal text-dark-100 sm:text-sm">
            @{user.username}
          </p>
        </div>
        <button
          className="col-start-3 row-start-1 w-fit text-13 font-semibold text-violet"
          onClick={() => setReply((prev) => !prev)}
        >
          Reply
        </button>
        <p className="col-span-3 col-start-1 row-start-2 text-13 font-normal text-dark-100 sm:col-start-2 sm:text-15">
          {replying_to && (
            <span className="text-13 text-violet">
              @{replying_to?.username}{" "}
            </span>
          )}
          {content}
        </p>
        {reply && (
          <div className="col-span-3 col-start-1 row-start-3 pt-2 sm:col-start-2">
            <AddReply />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

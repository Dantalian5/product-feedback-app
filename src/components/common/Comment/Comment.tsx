"use client";
import React from "react";

import Image from "next/image";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import AddReply from "@/components/forms/AddReply";
import type { Comment as TypeComment, User } from "@/types/global";

interface CommentProps {
  comment: TypeComment & { parentUser: User };
}
const Comment = ({ comment }: CommentProps) => {
  const [reply, setReply] = React.useState<boolean>(false);
  const { id, user, feedbackId, parentUser, content } = comment;
  const componentRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const session = !!useSession();

  const handleClickOnReply = () => {
    if (!session) {
      toast.error("Please Login to Reply");
      setReply(false);
    } else {
      setReply((prev) => !prev);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setReply(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-x-8">
      {user.image && user.image !== "" ? (
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className=" col-start-1 row-start-1 w-fit overflow-hidden rounded-full"
        />
      ) : (
        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-dark-800 bg-dark-100 font-semibold text-dark-700">
          {user.username[0].toUpperCase()}
        </span>
      )}

      <div className="col-start-2 row-start-1 flex w-full flex-col">
        <p className="text-xs font-bold text-dark-700 sm:text-sm">
          {user.name}
        </p>
        <p className="text-xs font-normal text-dark-600 sm:text-sm">
          @{user.username}
        </p>
      </div>
      <button
        className={`${!session && "opacity-50"} col-start-3 row-start-1 w-fit text-xs font-semibold text-blue-200`}
        onClick={handleClickOnReply}
        ref={buttonRef}
      >
        Reply
      </button>
      <p className="col-span-3 col-start-1 row-start-2 overflow-hidden text-ellipsis text-xs font-normal text-dark-600 sm:col-span-2 sm:col-start-2 sm:text-md">
        {parentUser && (
          <span className="text-xs text-violet-200">
            @{parentUser?.username}{" "}
          </span>
        )}
        {content}
      </p>
      {reply && user && (
        <div
          className="col-span-3 col-start-1 row-start-3 pt-2 sm:col-span-2 sm:col-start-2"
          ref={componentRef}
        >
          <AddReply feedbackId={feedbackId} commentId={id} />
        </div>
      )}
    </div>
  );
};

export default Comment;

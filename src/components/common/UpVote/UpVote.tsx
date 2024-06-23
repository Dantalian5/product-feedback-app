"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { svgUpArrow } from "@/utils/svgIcons";
import { upVoteFeedback } from "@/services/api";

interface UpVoteProps extends React.ComponentPropsWithRef<"button"> {
  value?: number;
  feedbackId: number;
}
const UpVote = (prop: UpVoteProps) => {
  const router = useRouter();
  const { value = 0, feedbackId } = prop;
  const [upvoted, setUpvoted] = React.useState<boolean>(false);

  const { data } = useSession();
  const handleUpVote = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!data) {
      e.preventDefault();
      toast.error("Please Login to UpVote a feedback");
    } else {
      try {
        upVoteFeedback(feedbackId);
        toast.success(`Feedback UpVoted!`);
        setUpvoted(true);
        router.refresh();
      } catch {
        toast.error("Ups, something whent wrong. Try again later");
      }
    }
  };
  return (
    <button
      className={`flex cursor-pointer flex-wrap items-center justify-center gap-x-[10px] gap-y-2 rounded-10 px-3 py-2 text-xs font-bold hover:bg-dark-500 ${upvoted ? "bg-blue-200 text-white" : "bg-dark-100 text-dark-700"} custom-focus min-w-10`}
      aria-label="upvote this feedback"
      onClick={handleUpVote}
    >
      <span className={`py-1.5 ${upvoted ? "text-white" : "text-blue-200"}`}>
        {svgUpArrow}
      </span>
      {value}
    </button>
  );
};

export default UpVote;

"use client";
import React from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { svgUpArrow } from "@/utils/svgIcons";
import { upVoteFeedback } from "@/services/actions/feedbackActions";

interface UpVoteProps extends React.ComponentPropsWithRef<"button"> {
  value?: number;
  feedbackId: number;
}
const UpVote = (prop: UpVoteProps) => {
  const router = useRouter();
  const { value = 0, feedbackId } = prop;
  const [upvoted, setUpvoted] = React.useState<boolean>(false);

  const handleUpVote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await upVoteFeedback(feedbackId);
      if (res) {
        toast.success(`Feedback UpVoted!`);
        setUpvoted(true);
        router.refresh();
      } else {
        toast.error("You most be logged in to upvote");
      }
    } catch (error: any) {
      toast.error("Oops, something went wrong. Try again later");
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

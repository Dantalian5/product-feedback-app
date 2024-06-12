import React from "react";
import { svgUpArrow } from "@/utils/svgIcons";

interface UpVoteProps extends React.ComponentPropsWithRef<"button"> {
  value?: number;
  upvoted?: boolean;
}
const UpVote = (prop: UpVoteProps) => {
  const { value = 0, onClick, upvoted = false } = prop;
  return (
    <button
      className={`flex cursor-pointer flex-wrap items-center justify-center gap-x-[10px] gap-y-2 rounded-10 px-3 py-2 text-13 font-bold hover:bg-gray-500 ${upvoted ? "bg-blue-200 text-white" : "bg-gray-100 text-dark-200"} custom-focus min-w-10`}
      aria-label="upvote this feedback"
    >
      <span className={`py-1.5 ${upvoted ? "text-white" : "text-blue-200"}`}>
        {svgUpArrow}
      </span>
      {value}
    </button>
  );
};

export default UpVote;

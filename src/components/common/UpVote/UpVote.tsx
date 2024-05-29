import React from "react";

interface UpVoteProps extends React.ComponentPropsWithRef<"button"> {
  value?: number;
  upvoted?: boolean;
}
const upVoteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="7"
    viewBox="0 0 11 7"
    fill="none"
  >
    <path
      d="M1.33398 6L5.33398 2L9.33398 6"
      stroke="currentColor"
      stroke-width="2"
    />
  </svg>
);
const UpVote = (prop: UpVoteProps) => {
  const { value = 99, onClick, upvoted = true } = prop;
  return (
    <button
      className={`text-13 rounded-10 flex cursor-pointer flex-col items-center gap-y-2  px-3 pb-2 pt-[14px] font-bold hover:bg-gray-500 ${upvoted ? "bg-blue-200 text-white" : "bg-gray-100 text-dark-200"}`}
      aria-label="upvote this feedback"
    >
      <span className={upvoted ? "text-white" : "text-blue-200"}>
        {upVoteIcon}
      </span>
      {value}
    </button>
  );
};

export default UpVote;

import React from "react";
import Link from "next/link";
import UpVote from "@/components/common/UpVote";
import { svgMessage, svgCircle } from "@/utils/svgIcons";

interface FeedbackProps {
  id: number;
  title: string;
  description: string;
  category: string;
  upvotes: number;
  commentsNumber: number;
  roadmap: { status: string; color: string };
  className?: string;
}

const FeedbackRM = (props: FeedbackProps) => {
  const {
    id,
    title,
    description,
    category,
    upvotes,
    commentsNumber,
    roadmap,
    className,
  } = props;
  return (
    <div
      className={`${className} relative z-10 flex flex-col gap-4 overflow-hidden rounded-10 bg-white px-5  py-6 before:absolute before:left-0 before:top-0 before:z-20 before:block before:h-[6px] before:w-full before:bg-${roadmap.color} before:content-['']`}
    >
      <span className="flex items-center gap-x-2 text-xs capitalize text-dark-600 lg:text-base">
        <span className={`text-8 text-${roadmap.color}`}>{svgCircle}</span>
        {roadmap.status}
      </span>
      <Link
        href={`/feedback/${id}`}
        className="mb-auto block w-full"
        aria-label="Go to Feedback details"
      >
        <h3
          className={`mb-2 text-xs font-bold text-dark-700 hover:text-blue-200 lg:text-lg`}
        >
          {title}
        </h3>
        <p className={`mb-auto text-xs font-normal text-dark-600 lg:text-base`}>
          {description}
        </p>
      </Link>
      <span className=" block w-fit cursor-pointer rounded-10 bg-dark-300 px-4 py-1.5 text-xs font-semibold capitalize text-blue-200">
        {category}
      </span>
      <div className="flex items-center justify-between">
        <div className={`mr-6 w-fit`}>
          <UpVote value={upvotes} feedbackId={id} />
        </div>
        <div className="ml-2 flex w-fit items-center justify-between gap-x-4">
          <span
            className={`${commentsNumber === 0 && " opacity-40"} flex items-center gap-x-2 text-xs font-bold text-dark-700 sm:text-base `}
          >
            {svgMessage}
            {commentsNumber}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackRM;

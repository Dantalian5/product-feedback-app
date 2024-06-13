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
}

const Feedback = (props: FeedbackProps) => {
  const { id, title, description, category, upvotes, commentsNumber } = props;
  return (
    <div
      className={`relative block w-full overflow-hidden rounded-10 bg-white p-6 sm:px-8 sm:py-7`}
    >
      <div
        className={`flex w-full flex-wrap items-center justify-between gap-4 sm:flex-nowrap`}
      >
        <Link
          href={`/feedback/${id}`}
          className="block w-full"
          aria-label="Go to Feedback details"
        >
          <h3 className={`mb-2 text-xs font-bold text-dark-200 sm:text-lg`}>
            {title}
          </h3>
          <p className={`mb-2 text-xs font-normal text-dark-100 sm:text-base`}>
            {description}
          </p>
          <span className=" block w-fit cursor-pointer rounded-10 bg-gray-300 px-4 py-1.5 text-xs font-semibold capitalize text-blue-200">
            {category}
          </span>
        </Link>
        <div className={`mr-6 w-fit self-start sm:order-first`}>
          <UpVote value={upvotes} />
        </div>
        <div className="ml-2 flex w-fit items-center justify-between gap-x-4">
          <span className="flex items-center gap-x-2 text-xs font-bold text-dark-200 sm:text-base">
            {svgMessage}
            {commentsNumber}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

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
  roadmap?: string;
}

const Feedback = (props: FeedbackProps) => {
  const { id, title, description, category, upvotes, commentsNumber, roadmap } =
    props;
  return (
    <div className="relative mb-4 block w-full overflow-hidden rounded-10 bg-white p-6 sm:px-8 sm:py-7">
      {roadmap && (
        <>
          <span className="absolute left-0 top-0 z-20 block h-[6px] w-full bg-violet"></span>
          <span className="mb-4 flex items-center gap-x-2 text-13 text-dark-100">
            <span className="text-8 text-violet">{svgCircle}</span>
            {roadmap}
          </span>
        </>
      )}
      <div className="flex w-full flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
        <Link
          href={`/feedback/${id}`}
          className="block w-full sm:ml-6 sm:mr-2"
          aria-label="Go to Feedback details"
        >
          <h3 className="mb-2 text-13 font-bold text-dark-200 sm:text-18">
            {title}
          </h3>
          <p className="mb-2 text-13 font-normal text-dark-100 sm:text-base">
            {description}
          </p>
          <span className=" block w-fit cursor-pointer rounded-10 bg-gray-300 px-4 py-1.5 text-13 font-semibold capitalize text-blue-200">
            {category}
          </span>
        </Link>
        <div className="w-fit self-start sm:order-first">
          <UpVote value={upvotes} />
        </div>
        <div className="flex w-fit items-center justify-between gap-x-4">
          <span className="flex items-center gap-x-2 text-13 font-bold text-dark-200 sm:text-base">
            {svgMessage}
            {commentsNumber}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

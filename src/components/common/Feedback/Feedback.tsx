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
    <div className="relative mb-4 overflow-hidden rounded-10 bg-white p-6">
      {roadmap && (
        <>
          <span className="absolute left-0 top-0 z-20 block h-[6px] w-full bg-violet"></span>
          <span className="mb-4 flex items-center gap-x-2 text-13 text-dark-100">
            <span className="text-8 text-violet">{svgCircle}</span>
            {roadmap}
          </span>
        </>
      )}
      <Link href={`/feedback/${id}`} className="block w-full">
        <h3 className="mb-2 text-13 font-bold text-dark-200">{title}</h3>
      </Link>
      <p className="mb-2 text-13 font-normal text-dark-100">{description}</p>
      <div className="mb-4">
        <span className=" block w-fit cursor-pointer rounded-10 bg-gray-300 px-4 py-1.5 text-13 font-semibold text-blue-200">
          {category}
        </span>
      </div>
      <div className="flex w-full items-center justify-between gap-x-4">
        <UpVote value={upvotes} />
        <span className="flex items-center gap-x-2 text-13 font-bold text-dark-200">
          {svgMessage}
          {commentsNumber}
        </span>
      </div>
    </div>
  );
};

export default Feedback;

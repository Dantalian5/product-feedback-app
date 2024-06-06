import React from "react";
import Link from "next/link";
import UpVote from "@/components/common/UpVote";
import { svgMessage } from "@/utils/svgIcons";

interface RequestProps {
  id: number;
  title: string;
  description: string;
  category: string;
  upvotes: number;
  commentsNumber: number;
}
const Request = (props: RequestProps) => {
  const { id, title, description, category, upvotes, commentsNumber } = props;
  return (
    <div className="mb-4 rounded-10 bg-white p-6">
      <Link href={`/request/${id}`} className="block w-full">
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

export default Request;

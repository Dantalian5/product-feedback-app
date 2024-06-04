import React from "react";
import UpVote from "@/components/common/UpVote";
import { svgMessage } from "@/utils/svg/svgIcons";

const Feedback = () => {
  return (
    <div className="rounded-10 mb-4 bg-white p-6">
      <h3 className="text-13 mb-2 font-bold text-dark-200">
        Add tags for solutions
      </h3>
      <p className="text-13 mb-2 font-normal text-dark-100">
        Easier to search for solutions based on a specific stack.
      </p>
      <div className="mb-4">
        <span className=" text-13 rounded-10 block w-fit cursor-pointer bg-gray-300 px-4 py-1.5 font-semibold text-blue-200">
          Enhancement
        </span>
      </div>
      <div className="flex w-full items-center justify-between gap-x-4">
        <UpVote value={112} />
        <span className="text-13 flex items-center gap-x-2 font-bold text-dark-200">
          {svgMessage}2
        </span>
      </div>
    </div>
  );
};

export default Feedback;

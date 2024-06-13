import React from "react";
import LinkBtn from "@/components/common/LinkBtn";
import Main from "@/components/layout/Main";
import RoadMap from "@/components/layout/RoadMap";
import type { TypeFeedbackWithCmtsCnt as TypeFeedback } from "@/types/dataTypes";
import { fetchRequests } from "@/services/api";

const RoadmapPage = async () => {
  const feedbacks: TypeFeedback[] = await fetchRequests();
  return (
    <div>
      <div className="bg-dark-800 flex w-full items-center justify-between gap-x-4 p-6 sm:mb-8 sm:rounded-10 sm:px-8 sm:py-7">
        <div className="flex flex-col items-start">
          <LinkBtn href="/" classe="noneWhite" icon>
            Go Back
          </LinkBtn>
          <h1 className="text-lg font-bold tracking-tighter text-white sm:text-2xl">
            Roadmap
          </h1>
        </div>
        <LinkBtn href="/feedback/new" classe="violet">
          + Add Feedback
        </LinkBtn>
      </div>
      <RoadMap feedbacks={feedbacks} />
    </div>
  );
};

export default RoadmapPage;

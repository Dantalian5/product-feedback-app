import React from "react";
import LinkBtn from "@/components/common/LinkBtn";
import Main from "@/components/layout/Main";
import RoadMap from "@/components/layout/RoadMap";
import type { RequestType } from "@/types/dataTypes";
import { fetchRequests } from "@/services/api";

const RoadmapPage = async () => {
  const feedbacks = await fetchRequests();
  const plannedFeedbacks = feedbacks.filter(
    (request: RequestType) => request.status === "planned",
  );
  const inprogressFeedbacks = feedbacks.filter(
    (request: RequestType) => request.status === "in-progress",
  );
  const liveFeedbacks = feedbacks.filter(
    (request: RequestType) => request.status === "live",
  );

  return (
    <div>
      <div className="flex w-full items-center justify-between gap-x-4 bg-dark-300 p-6">
        <div className="">
          <LinkBtn href="/" iconColor="white" textColor="white" isStretched>
            Go Back
          </LinkBtn>
          <h1 className="text-18 font-bold tracking-tighter text-white">
            Roadmap
          </h1>
        </div>
        <LinkBtn href="/feedback/new" bgColor="violet" textColor="white">
          + Add Feedback
        </LinkBtn>
      </div>
      <RoadMap feedbacks={feedbacks ? feedbacks : []} />
    </div>
  );
};

export default RoadmapPage;

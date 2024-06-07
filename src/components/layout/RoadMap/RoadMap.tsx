"use client";
import React from "react";
import Feedback from "@/components/common/Feedback";
import type { RequestType } from "@/types/dataTypes";

const RoadMap = ({ feedbacks }: { feedbacks: RequestType[] }) => {
  const plannedFeedbacks = feedbacks.filter(
    (request: RequestType) => request.status === "planned",
  );
  const inprogressFeedbacks = feedbacks.filter(
    (request: RequestType) => request.status === "in-progress",
  );
  const liveFeedbacks = feedbacks.filter(
    (request: RequestType) => request.status === "live",
  );
  const tabs = ["Planned", "In-Progress", "Live"];
  const [activeTab, setActiveTab] = React.useState<string>(tabs[0]);

  return (
    <section>
      <div className="align-center flex border-b border-b-dark-100/20">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`w-full px-2 py-5 text-13 font-bold text-dark-200 ${
              tab.toLowerCase() === activeTab.toLowerCase() &&
              "border-b-4 border-b-violet"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {" ("}
            {
              feedbacks.filter(
                (feedback: RequestType) =>
                  feedback.status.toLowerCase() === tab.toLowerCase(),
              ).length
            }
            {") "}
          </button>
        ))}
      </div>
      <div className="p-6">
        {feedbacks
          .filter(
            (feedback: RequestType) =>
              feedback.status.toLowerCase() === activeTab.toLowerCase(),
          )
          .map((feedback, index) => (
            <Feedback
              key={index}
              id={feedback.id}
              title={feedback.title}
              description={feedback.description}
              category={feedback.category}
              upvotes={feedback.upvotes}
              roadmap={activeTab}
              commentsNumber={
                feedback.comments_count ? feedback.comments_count : 0
              }
            />
          ))}
      </div>
    </section>
  );
};

export default RoadMap;

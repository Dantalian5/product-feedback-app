"use client";
import React from "react";
import FeedbackRM from "@/components/common/FeedbackRM";
import type { TypeFeedbackWithCmtsCnt as TypeFeedback } from "@/types/dataTypes";

const RoadMap = ({ feedbacks }: { feedbacks: TypeFeedback[] }) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(true);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  feedbacks.sort((a, b) => b.upvotes - a.upvotes);
  const roadmap = [
    {
      status: "planned",
      feedbacks: feedbacks.filter(
        (request: TypeFeedback) => request.status === "planned",
      ),
      description: "Ideas prioritized for research",
      color: "orange-100",
    },
    {
      status: "in-progress",
      feedbacks: feedbacks.filter(
        (request: TypeFeedback) => request.status === "in-progress",
      ),
      description: "Currently being developed",
      color: "violet-200",
    },
    {
      status: "live",
      feedbacks: feedbacks.filter(
        (request: TypeFeedback) => request.status === "live",
      ),
      description: "Released features",
      color: "blue-100",
    },
  ];
  const [activeTab, setActiveTab] = React.useState<string>(roadmap[0].status);
  const filteredRoadmap = isMobile
    ? roadmap.filter((e) => e.status === activeTab.toLowerCase())
    : roadmap;

  return (
    <>
      <div className="align-center border-b-dark-600/20 flex border-b sm:hidden">
        {roadmap.map(({ status, color }) => (
          <button
            key={status}
            className={`text-dark-700 w-full px-2 py-5 text-xs font-bold ${
              status.toLowerCase() === activeTab.toLowerCase() &&
              `border-b-4 border-b-${color}`
            }`}
            onClick={() => setActiveTab(status)}
          >
            {status}
            {" ("}
            {
              feedbacks.filter(
                (feedback: TypeFeedback) =>
                  feedback.status.toLowerCase() === status.toLowerCase(),
              ).length
            }
            {") "}
          </button>
        ))}
      </div>
      <section className="grid w-full grid-cols-[auto] grid-rows-[auto] gap-x-2.5 gap-y-4 p-6 sm:p-0 lg:gap-x-7 lg:gap-y-6">
        {filteredRoadmap.map(({ status, feedbacks, description, color }, i) => (
          <React.Fragment key={status}>
            <div
              className={`mb-2 col-start-${i + 1} col-span-1 row-span-1 row-start-1`}
            >
              <h3 className="text-dark-700 mb-1 text-lg font-bold capitalize tracking-[-0.181px]">
                {status} ({feedbacks.length})
              </h3>
              <p className="text-dark-600 text-xs font-normal">{description}</p>
            </div>
            {feedbacks.map((feedback, j) => (
              <FeedbackRM
                key={feedback.id}
                id={feedback.id}
                title={feedback.title}
                description={feedback.description}
                category={feedback.category}
                upvotes={feedback.upvotes}
                roadmap={{ status: status, color: color }}
                className={`col-start-${i + 1} row-start-${j + 2} col-span-1 row-span-1 w-full`}
                commentsNumber={feedback.comments_count}
              />
            ))}
          </React.Fragment>
        ))}
      </section>
    </>
  );
};

export default RoadMap;

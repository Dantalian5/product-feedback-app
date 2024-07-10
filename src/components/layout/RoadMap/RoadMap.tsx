"use client";
import React from "react";

import FeedbackRM from "@/components/common/FeedbackRM";
import type { Feedback } from "@/types/global";

const RoadMap = ({ feedbacks }: { feedbacks: Feedback[] }) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(true);
  feedbacks.sort((a, b) => b.upvotes - a.upvotes);
  const filterByStatus = (status: string) => {
    const newArray = feedbacks.filter((element) => element.status === status);
    return newArray;
  };

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

  const roadmap = [
    {
      status: "planned",
      feedbacks: filterByStatus("planned"),
      description: "Ideas prioritized for research",
      color: "orange-100",
    },
    {
      status: "in-progress",
      feedbacks: filterByStatus("in-progress"),
      description: "Currently being developed",
      color: "violet-200",
    },
    {
      status: "live",
      feedbacks: filterByStatus("live"),
      description: "Released features",
      color: "blue-100",
    },
  ];
  const [activeTab, setActiveTab] = React.useState<string>(roadmap[0].status);
  const filteredRoadmap = isMobile
    ? roadmap.filter(({ status }) => status === activeTab.toLowerCase())
    : roadmap;

  return (
    <>
      <div className="align-center flex border-b border-b-dark-600/20 sm:hidden">
        {roadmap.map(({ status, color }) => (
          <button
            key={status}
            className={`w-full px-2 py-5 text-xs font-bold text-dark-700 ${
              status.toLowerCase() === activeTab.toLowerCase() &&
              `border-b-4 border-b-${color}`
            }`}
            onClick={() => setActiveTab(status)}
          >
            {status}
            {" ("}
            {
              feedbacks.filter(
                (feedback: Feedback) =>
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
              <h3 className="mb-1 text-lg font-bold capitalize tracking-[-0.181px] text-dark-700">
                {status} ({feedbacks.length})
              </h3>
              <p className="text-xs font-normal text-dark-600">{description}</p>
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
                commentsNumber={feedback.commentsCount}
              />
            ))}
          </React.Fragment>
        ))}
      </section>
    </>
  );
};

export default RoadMap;

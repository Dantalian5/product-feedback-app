import React from "react";

import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import { getAllFeedbacks } from "@/services/actions/feedbackActions";
import FilterProvider from "@/components/context/FilterProvider";
import type { Feedback } from "@/types/global";

const Home = async () => {
  // const feedbacks = await getFeedbacks();
  const feedbacks: Feedback[] = await getAllFeedbacks();
  const roadmap = {
    planned: feedbacks.filter((feedback) => feedback.status === "planned")
      .length,
    inProgress: feedbacks.filter(
      (feedback) => feedback.status === "in-progress",
    ).length,
    live: feedbacks.filter((feedback) => feedback.status === "live").length,
  };

  return (
    <div className="flex flex-col gap-x-8 sm:gap-y-10 lg:flex-row">
      <FilterProvider>
        <div className=" w-full lg:max-w-[255px]">
          <Header roadmap={roadmap} />
        </div>
        <Main feedbacks={feedbacks} />
      </FilterProvider>
    </div>
  );
};

export default Home;

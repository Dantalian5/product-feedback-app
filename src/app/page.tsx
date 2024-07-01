import React from "react";

import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import { getFeedbacks } from "@/services/api";
import FilterProvider from "@/components/context/FilterProvider/FilterProvider";
import type { TypeFeedbackWithCmtsCnt as TypeFeedback } from "@/types/dataTypes";

const Home = async () => {
  const feedbacks = (await getFeedbacks()) || [];
  const roadmap = {
    planned: feedbacks.filter(
      (request: TypeFeedback) => request.status === "planned",
    ).length,
    in_progress: feedbacks.filter(
      (request: TypeFeedback) => request.status === "in-progress",
    ).length,
    live: feedbacks.filter((request: TypeFeedback) => request.status === "live")
      .length,
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

import React from "react";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import type { TypeFeedbackWithCmtsCnt as TypeFeedback } from "@/types/dataTypes";
import { getFeedbacks } from "@/services/api";

const Home = async () => {
  const productFeedbacks = (await getFeedbacks()) || [];

  const roadmap = {
    planned: productFeedbacks.filter(
      (request: TypeFeedback) => request.status === "planned",
    ).length,
    in_progress: productFeedbacks.filter(
      (request: TypeFeedback) => request.status === "in-progress",
    ).length,
    live: productFeedbacks.filter(
      (request: TypeFeedback) => request.status === "live",
    ).length,
  };

  return (
    <div className="flex flex-col gap-x-8 sm:gap-y-10 lg:flex-row">
      <div className=" w-full lg:max-w-[255px]">
        <Header roadmap={roadmap} />
      </div>
      <div className=" w-full flex-auto">
        <Main feedbacks={productFeedbacks} />
      </div>
    </div>
  );
};

export default Home;

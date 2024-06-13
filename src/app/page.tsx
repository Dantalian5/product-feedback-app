import React from "react";
import Header from "@/components/layout/Header";
import ActionBar from "@/components/layout/ActionBar";
import Main from "@/components/layout/Main";
import type { RequestType } from "@/types/dataTypes";
import { fetchRequests } from "@/services/api";

const Home = async () => {
  const productRequests = (await fetchRequests()) || [];

  const roadmap = {
    planned: productRequests.filter(
      (request: RequestType) => request.status === "planned",
    ).length,
    in_progress: productRequests.filter(
      (request: RequestType) => request.status === "in-progress",
    ).length,
    live: productRequests.filter(
      (request: RequestType) => request.status === "live",
    ).length,
  };
  const suggestions = Object.values(roadmap).reduce(
    (sum, value) => sum + value,
    0,
  );

  return (
    <div className="flex flex-col gap-x-8 sm:gap-y-10 lg:flex-row">
      <div className=" w-full lg:max-w-[255px]">
        <Header roadmap={roadmap} />
      </div>
      <div className=" w-full flex-auto">
        <Main feedbacks={productRequests} />
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import Header from "@/components/layout/Header";
import ActionBar from "@/components/layout/ActionBar";
import Main from "@/components/layout/Main";
import type { RequestType } from "@/types/dataTypes";
import { fetchRequests } from "@/services/api";

const Home = async () => {
  const productRequests = (await fetchRequests()) || [];

  const roadmap = {
    planned: productRequests
      ? productRequests.filter(
          (request: RequestType) => request.status === "planned",
        ).length
      : 0,
    in_progress: productRequests
      ? productRequests.filter(
          (request: RequestType) => request.status === "in-progress",
        ).length
      : 0,
    live: productRequests
      ? productRequests.filter(
          (request: RequestType) => request.status === "live",
        ).length
      : 0,
  };
  const suggestions = Object.values(roadmap).reduce(
    (sum, value) => sum + value,
    0,
  );

  return (
    <div>
      <Header roadmap={roadmap} />
      <ActionBar suggestions={suggestions} />
      <Main requests={productRequests ? productRequests : []} />
    </div>
  );
};

export default Home;

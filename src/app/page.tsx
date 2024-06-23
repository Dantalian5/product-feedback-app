import React from "react";

import Main from "@/components/layout/Main";
import type { TypeFeedbackWithCmtsCnt as TypeFeedback } from "@/types/dataTypes";
import { getFeedbacks } from "@/services/api";

const Home = async () => {
  const productFeedbacks = (await getFeedbacks()) || [];

  return (
    <div className="flex flex-col gap-x-8 sm:gap-y-10 lg:flex-row">
      <Main feedbacks={productFeedbacks} />
    </div>
  );
};

export default Home;

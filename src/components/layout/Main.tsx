"use client";
import React from "react";
import Feedback from "@/components/common/Feedback";
import EmptyFeedback from "@/components/common/EmptyFeedback";
import data from "@/data/data.json";
import type { FeedbackType } from "@/utils/types/dataTypes";

const Main = () => {
  const { currentUser, productRequests } = data;

  return (
    <main className="px-6 py-8">
      {productRequests.length === 0 ? (
        <EmptyFeedback />
      ) : (
        productRequests.map((request: FeedbackType) => (
          <Feedback
            key={request.id}
            title={request.title}
            description={request.description}
            category={request.category}
            upvotes={request.upvotes}
            commentsNumber={request.comments ? request.comments.length : 0}
          />
        ))
      )}
    </main>
  );
};

export default Main;

import React from "react";
import Request from "@/components/common/Request";
import Empty from "@/components/common/Empty";
import { nanoid } from "nanoid";
import type { RequestType } from "@/types/dataTypes";

interface MainProps {
  requests: RequestType[];
}
const Main = (props: MainProps) => {
  const { requests } = props;

  return (
    <main className="px-6 py-8">
      {requests.length === 0 ? (
        <Empty />
      ) : (
        requests.map((request: RequestType) => (
          <Request
            key={nanoid()}
            id={request.id}
            title={request.title}
            description={request.description}
            category={request.category}
            upvotes={request.upvotes}
            commentsNumber={request.comments_count ? request.comments_count : 0}
          />
        ))
      )}
    </main>
  );
};

export default Main;

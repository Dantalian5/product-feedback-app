import React from "react";
import Request from "@/components/common/Request";
import Button from "@/components/common/Button";
import LinkBtn from "@/components/common/LinkBtn";
import type { RequestType } from "@/types/dataTypes";
import { fetchRequests, fetchComments } from "@/services/api";

interface DetailsProps {
  params: {
    id: string;
  };
}
const Details = async ({ params }: DetailsProps) => {
  const id = parseInt(params.id);
  const request: RequestType = await fetchRequests(id);
  const comments = await fetchComments(id);

  return (
    <div className="p-6">
      <div className="mb-6 flex w-full items-center justify-between">
        <LinkBtn icon isStretched href="/">
          Go Back
        </LinkBtn>
        <Button color="blue">Edit Feedback</Button>
      </div>
      {request && (
        <Request
          key={request.id}
          id={request.id}
          title={request.title}
          description={request.description}
          category={request.category}
          upvotes={request.upvotes}
          commentsNumber={request.comments_count ? request.comments_count : 0}
        />
      )}
    </div>
  );
};

export default Details;

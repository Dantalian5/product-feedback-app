import React from "react";
import Feedback from "@/components/common/Feedback";
import LinkBtn from "@/components/common/LinkBtn";
import AddComment from "@/components/forms/AddComment";
import CommentsWrapper from "@/components/layout/CommentsWrapper";
import type { RequestType, CommentWithInfo } from "@/types/dataTypes";
import { fetchRequests, fetchComments } from "@/services/api";

interface DetailsProps {
  params: {
    id: string;
  };
}
const Details = async ({ params }: DetailsProps) => {
  const id = parseInt(params.id);
  const request: RequestType = await fetchRequests(id);
  const comments: CommentWithInfo[] = (await fetchComments(id)) || [];
  const parentComments = comments.filter(
    (comment) => comment.parent_comment_id === null,
  );
  const childComments = comments.filter(
    (comment) => comment.parent_comment_id !== null,
  );

  return (
    <>
      <div className="mb-6 flex w-full items-center justify-between">
        <LinkBtn iconColor="blue" isStretched href="/">
          Go Backs
        </LinkBtn>
        <LinkBtn href={`/feedback/${id}/edit`} bgColor="blue" textColor="white">
          Edit Feedback
        </LinkBtn>
      </div>
      {
        <Feedback
          id={request.id}
          title={request.title}
          description={request.description}
          category={request.category}
          upvotes={request.upvotes}
          commentsNumber={request.comments_count ? request.comments_count : 0}
        />
      }
      <CommentsWrapper comments={comments} />
      <AddComment requestId={id} />
    </>
  );
};

export default Details;

import React from "react";
import Feedback from "@/components/common/Feedback";
import LinkBtn from "@/components/common/LinkBtn";
import AddComment from "@/components/forms/AddComment";
import CommentsWrapper from "@/components/layout/CommentsWrapper";
import type {
  TypeFeedbackWithCmtsCnt as TypeFeedback,
  TypeCommentWithInfo as TypeComment,
} from "@/types/dataTypes";
import { fetchRequests, fetchComments } from "@/services/api";

interface DetailsProps {
  params: {
    id: string;
  };
}
const Details = async ({ params }: DetailsProps) => {
  const id = parseInt(params.id);
  const feedback: TypeFeedback = await fetchRequests(id);
  const comments: TypeComment[] = (await fetchComments(id)) || [];
  const parentComments = comments.filter(
    (comment) => comment.parent_comment_id === null,
  );
  const childComments = comments.filter(
    (comment) => comment.parent_comment_id !== null,
  );

  return (
    <div className="mx-auto flex w-full max-w-[730px] flex-col gap-y-6">
      <div className="flex w-full items-center justify-between">
        <LinkBtn classe="noneDark" icon href="/">
          Go Backs
        </LinkBtn>
        <LinkBtn href={`/feedback/${id}/edit`} classe="blue">
          Edit Feedback
        </LinkBtn>
      </div>
      {
        <Feedback
          id={feedback.id}
          title={feedback.title}
          description={feedback.description}
          category={feedback.category}
          upvotes={feedback.upvotes}
          commentsNumber={feedback.comments_count}
        />
      }
      <CommentsWrapper comments={comments} />
      <AddComment requestId={id} />
    </div>
  );
};

export default Details;

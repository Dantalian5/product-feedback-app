import React from "react";

import { getFeedbackById } from "@/services/api";
import Feedback from "@/components/common/Feedback";
import LinkBtn from "@/components/common/LinkBtn";
import AddComment from "@/components/forms/AddComment";
import CommentsWrapper from "@/components/layout/CommentsWrapper";
interface DetailsProps {
  params: {
    id: string;
  };
}
const Details = async ({ params }: DetailsProps) => {
  const id = parseInt(params.id);
  const feedback = await getFeedbackById(id, true);
  const {
    title,
    description,
    category,
    upvotes,
    commentsCount,
    comments,
    isEditable,
  } = feedback;

  return (
    <div className="mx-auto flex w-full max-w-[730px] flex-col gap-y-6">
      <div className="flex w-full items-center justify-between">
        <LinkBtn classe="noneDark" icon href="/">
          Go Backs
        </LinkBtn>
        {isEditable && (
          <LinkBtn href={`/feedback/${id}/edit`} classe="blue">
            Edit Feedback
          </LinkBtn>
        )}
      </div>
      {
        <Feedback
          id={id}
          title={title}
          description={description}
          category={category}
          upvotes={upvotes}
          commentsNumber={commentsCount}
        />
      }
      <CommentsWrapper comments={comments || []} />
      <AddComment feedbackId={id} />
    </div>
  );
};

export default Details;

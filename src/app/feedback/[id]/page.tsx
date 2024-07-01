import React from "react";

import { auth } from "@/auth";
import Feedback from "@/components/common/Feedback";
import LinkBtn from "@/components/common/LinkBtn";
import AddComment from "@/components/forms/AddComment";
import CommentsWrapper from "@/components/layout/CommentsWrapper";

import UserProvider from "@/components/context/UserProvider";

import type {
  TypeFeedbackWithCmtsCnt as TypeFeedback,
  TypeComment,
  TypeUser,
} from "@/types/dataTypes";
import { getFeedbacks, getComments } from "@/services/api";

interface DetailsProps {
  params: {
    id: string;
  };
}
const Details = async ({ params }: DetailsProps) => {
  const id = parseInt(params.id);
  const feedback: TypeFeedback = await getFeedbacks(id);
  const comments: TypeComment[] = (await getComments(id)) || [];
  const session = await auth();
  const user = session?.user || null;
  const isPropietaryUser = user && feedback.user_id === Number(user.id);

  return (
    <div className="mx-auto flex w-full max-w-[730px] flex-col gap-y-6">
      <div className="flex w-full items-center justify-between">
        <LinkBtn classe="noneDark" icon href="/">
          Go Backs
        </LinkBtn>
        {isPropietaryUser && (
          <LinkBtn href={`/feedback/${id}/edit`} classe="blue">
            Edit Feedback
          </LinkBtn>
        )}
      </div>
      {
        <Feedback
          id={feedback.id}
          title={feedback.title}
          description={feedback.description}
          category={feedback.category}
          upvotes={feedback.upvotes || 0}
          commentsNumber={feedback.comments_count}
        />
      }
      <UserProvider user={user as TypeUser | null}>
        <CommentsWrapper comments={comments} />
        <AddComment feedbackId={id} />
      </UserProvider>
    </div>
  );
};

export default Details;

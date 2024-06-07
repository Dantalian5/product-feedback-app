import React from "react";
import { nanoid } from "nanoid";
import Request from "@/components/common/Request";
import Comment from "@/components/common/Comment";
import Button from "@/components/common/Button";
import LinkBtn from "@/components/common/LinkBtn";
import AddComment from "@/components/forms/AddComment";
import type { RequestType, CommentType } from "@/types/dataTypes";
import { fetchRequests, fetchComments } from "@/services/api";

interface DetailsProps {
  params: {
    id: string;
  };
}
const Details = async ({ params }: DetailsProps) => {
  const id = parseInt(params.id);
  const request: RequestType = await fetchRequests(id);
  const comments = (await fetchComments(id)) || [];
  const parentComments = comments.filter(
    (comment) => comment.parent_comment_id === null,
  );
  const childComments = comments.filter(
    (comment) => comment.parent_comment_id !== null,
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex w-full items-center justify-between">
        <LinkBtn icon isStretched href="/">
          Go Backs
        </LinkBtn>
        <Button color="blue">Edit Feedback</Button>
      </div>
      {request && (
        <Request
          id={request.id}
          title={request.title}
          description={request.description}
          category={request.category}
          upvotes={request.upvotes}
          commentsNumber={request.comments_count ? request.comments_count : 0}
        />
      )}
      <div className="flex flex-col items-start justify-start gap-y-6 rounded-10 bg-white p-6">
        <h2 className="text-18 font-bold tracking-tighter text-dark-200">
          {comments.length} Comments
        </h2>
        {parentComments.map((comment) => (
          <div key={nanoid()} className="flex w-full flex-col gap-y-6">
            <Comment
              user={comment.user}
              content={comment.content}
              replying_to={comment.replying_to}
            />
            {childComments
              .filter(
                (childComment) => childComment.parent_comment_id === comment.id,
              )
              .map((childComment) => (
                <div
                  key={nanoid()}
                  className="border-l border-l-dark-100/10 pl-6 "
                >
                  <Comment
                    user={childComment.user}
                    content={childComment.content}
                    replying_to={childComment.replying_to}
                  />
                </div>
              ))}
          </div>
        ))}
      </div>
      <AddComment requestId={id} />
    </div>
  );
};

export default Details;

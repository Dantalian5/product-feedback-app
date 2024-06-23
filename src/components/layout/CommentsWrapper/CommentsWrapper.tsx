import React from "react";
import Comment from "@/components/common/Comment";
import type { TypeComment, TypeUser } from "@/types/dataTypes";
import { Span } from "next/dist/trace";

const recursiveCommentsOrderer = (list: TypeComment[]) => {
  const orderedList: TypeComment[] = [];
  const recursiveSort = (element: any) => {
    orderedList.push(element);
    list
      .filter((e) => e.replying_to === element.id)
      .forEach((reply) => recursiveSort(reply));
  };
  list.filter((e) => e.replying_to === null).forEach((e) => recursiveSort(e));
  return orderedList;
};

const CommentsWrapper = ({ comments }: { comments: TypeComment[] }) => {
  const orderedComments = recursiveCommentsOrderer(comments);

  return (
    <section className="flex flex-col items-start justify-start gap-y-6 rounded-10 bg-white p-6 sm:gap-y-8 sm:px-8 sm:pb-10 lg:pb-12">
      <h2 className="text-lg font-bold tracking-tighter text-dark-700">
        {comments.length} Comments
      </h2>
      {orderedComments.map((comment, index) => (
        <React.Fragment key={comment.id}>
          {!comment.replying_to && index !== 0 && (
            <span className="h-[1px] w-full bg-dark-600/20 first:hidden"></span>
          )}
          <div
            className={`${comment.replying_to && "relative pl-6 after:absolute after:left-5 after:top-0 after:h-full after:w-0 after:border-l after:border-l-dark-600/10 after:content-[''] sm:pl-11"} w-full`}
          >
            <Comment
              id={comment.id}
              feedbackId={comment.feedback_id}
              user={comment.user as TypeUser}
              content={comment.content}
              replying_to={
                comments.find((e) => e.id === comment.replying_to)
                  ?.user as TypeUser
              }
            />
          </div>
        </React.Fragment>
      ))}
    </section>
  );
};

export default CommentsWrapper;

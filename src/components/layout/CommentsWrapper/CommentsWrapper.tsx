import React from "react";
import { nanoid } from "nanoid";
import Comment from "@/components/common/Comment";
import type { CommentWithInfo } from "@/types/dataTypes";

const CommentsWrapper = ({ comments }: { comments: CommentWithInfo[] }) => {
  return (
    <section className="mb-6 flex flex-col items-start justify-start gap-y-6 rounded-10 bg-white p-6 sm:pb-8">
      <h2 className="text-18 font-bold tracking-tighter text-dark-200">
        {comments.length} Comments
      </h2>
      <div className="flex w-full flex-col gap-y-6"></div>
      {comments
        .filter((comment) => comment.parent_comment_id === null)
        .map((parentComment, index) => (
          <>
            <Comment
              key={nanoid()}
              user={parentComment.user}
              content={parentComment.content}
              replying_to={parentComment.replying_to}
            />
            {comments
              .filter(
                (comment) => comment.parent_comment_id === parentComment.id,
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
            <span className="h-[1px] w-full bg-dark-100/20 last:hidden"></span>
          </>
        ))}
    </section>
  );
};

export default CommentsWrapper;

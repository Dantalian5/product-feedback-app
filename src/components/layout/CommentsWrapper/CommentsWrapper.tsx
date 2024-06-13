import React from "react";
import Comment from "@/components/common/Comment";
import type { TypeCommentWithInfo as TypeComment } from "@/types/dataTypes";

const CommentsWrapper = ({ comments }: { comments: TypeComment[] }) => {
  return (
    <section className="flex flex-col items-start justify-start gap-y-6 rounded-10 bg-white p-6 sm:gap-y-8 sm:px-8 sm:pb-10 lg:pb-12">
      <h2 className="text-dark-700 text-lg font-bold tracking-tighter">
        {comments.length} Comments
      </h2>
      {comments
        .filter((comment) => comment.parent_comment_id === null)
        .map((parentComment) => (
          <React.Fragment key={parentComment.id}>
            <Comment
              key={parentComment.id}
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
                  key={childComment.id}
                  className="border-l-dark-600/10 border-l pl-6 sm:ml-5 "
                >
                  <Comment
                    user={childComment.user}
                    content={childComment.content}
                    replying_to={childComment.replying_to}
                  />
                </div>
              ))}
            <span className="bg-dark-600/20 h-[1px] w-full last:hidden"></span>
          </React.Fragment>
        ))}
    </section>
  );
};

export default CommentsWrapper;

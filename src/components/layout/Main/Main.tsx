"use client";
import React from "react";
import Feedback from "@/components/common/Feedback";
import Empty from "@/components/common/Empty";
import LinkBtn from "@/components/common/LinkBtn";
import SortBy from "@/components/common/SortBy";
import { svgLightBulb } from "@/utils/svgIcons";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import type {
  TypeFeedbackWithCmtsCnt as TypeFeedback,
  TypeOption as Option,
} from "@/types/dataTypes";

interface MainProps {
  feedbacks: TypeFeedback[];
}
const sortOptions: Option[] = [
  { label: "Most Upvotes", value: "1sbmu" },
  { label: "Least Upvotes", value: "2sblu" },
  { label: "Most Comments", value: "3sbmc" },
  { label: "Least Comments", value: "4sblc" },
];
const Main = (props: MainProps) => {
  const { feedbacks } = props;
  const [sortAlg, setSortAlg] = React.useState<Option>(sortOptions[0]);

  const sortFn = (a: TypeFeedback, b: TypeFeedback) => {
    switch (sortAlg.value) {
      case "1sbmu":
        return b.upvotes - a.upvotes;
        break;
      case "2sblu":
        return a.upvotes - b.upvotes;
        break;
      case "3sbmc":
        return b.comments_count - a.comments_count;
        break;
      case "4sblc":
        return b.comments_count - a.comments_count;
        break;
      default:
        return 0;
    }
  };

  const suggestions = feedbacks
    .filter((e) => e.status === "suggestion")
    .sort(sortFn);

  const { data } = useSession();
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!data) {
      e.preventDefault();
      toast.error("Please Login to Add Feedback");
    }
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between gap-x-4 bg-dark-800 px-6 py-2 sm:rounded-10 sm:py-[14px]">
        <div className="flex items-center gap-x-10">
          <div className="hidden items-center gap-x-4 xl:flex ">
            <span>{svgLightBulb}</span>
            <p className="text-lg font-bold text-white">
              {suggestions.length} Suggestions
            </p>
          </div>
          <SortBy
            options={sortOptions}
            selectedOption={sortAlg}
            handleChange={setSortAlg}
          />
        </div>
        <LinkBtn href="/feedback/new" classe="violet" onClick={handleLink}>
          + Add Feedback
        </LinkBtn>
      </div>
      <main className="flex flex-col gap-4 px-6 py-8 sm:px-0 sm:py-6 ">
        {suggestions.length === 0 ? (
          <Empty />
        ) : (
          suggestions.map((feedback: TypeFeedback) => (
            <Feedback
              key={feedback.id}
              id={feedback.id}
              title={feedback.title}
              description={feedback.description}
              category={feedback.category}
              upvotes={feedback.upvotes}
              commentsNumber={feedback.comments_count}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Main;

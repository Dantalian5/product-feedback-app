import React from "react";
import SortBy from "@/components/common/SortBy";
import LinkBtn from "@/components/common/LinkBtn";

const ActionBar = () => {
  return (
    <div className="flex w-full items-center justify-between gap-x-4 bg-dark-300 px-6 py-2">
      <SortBy />
      <LinkBtn href="/feedback/new" bgColor="violet" textColor="white">
        + Add Feedback
      </LinkBtn>
    </div>
  );
};

export default ActionBar;

import React from "react";
import SortBy from "@/components/common/SortBy";
import LinkBtn from "@/components/common/LinkBtn";
import { svgLightBulb } from "@/utils/svgIcons";

interface ActionBarProps {
  suggestions: number;
}
const ActionBar = (props: ActionBarProps) => {
  const { suggestions } = props;
  return (
    <div className="flex w-full items-center justify-between gap-x-4 bg-dark-300 px-6 py-2 sm:rounded-10 sm:py-[14px]">
      <div className="flex items-center gap-x-10">
        <div className="hidden items-center gap-x-4 sm:flex">
          <span>{svgLightBulb}</span>
          <p className="text-18 font-bold text-white">
            {suggestions} Suggestions
          </p>
        </div>
        <SortBy />
      </div>
      <LinkBtn href="/feedback/new" bgColor="violet" textColor="white">
        + Add Feedback
      </LinkBtn>
    </div>
  );
};

export default ActionBar;

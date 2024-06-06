import React from "react";
import SortBy from "@/components/common/SortBy";
import Button from "@/components/common/Button";

const ActionBar = () => {
  return (
    <div className="flex w-full items-center justify-between gap-x-4 bg-dark-300 px-6 py-2">
      <SortBy />
      <Button color="violet">+ Add Feedback</Button>
    </div>
  );
};

export default ActionBar;

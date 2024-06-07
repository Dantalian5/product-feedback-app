import React from "react";
import LinkBtn from "@/components/common/LinkBtn";
import FormFeedback from "@/components/forms/FormFeedback";

const NewFeedback = () => {
  return (
    <div>
      <div className=" mb-14 flex w-full items-center justify-between">
        <LinkBtn iconColor="blue" isStretched href="/">
          Go Backs
        </LinkBtn>
      </div>
      <FormFeedback />
    </div>
  );
};

export default NewFeedback;

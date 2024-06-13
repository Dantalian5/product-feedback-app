import React from "react";
import LinkBtn from "@/components/common/LinkBtn";
import FormFeedback from "@/components/forms/FormFeedback";
import { fetchRequests } from "@/services/api";
import type { TypeFeedback } from "@/types/dataTypes";

interface EditFeedbackProps {
  params: {
    id: string;
  };
}

const EditFeedback = async (props: EditFeedbackProps) => {
  const id = parseInt(props.params.id);
  const feedback: TypeFeedback = await fetchRequests(id);

  return (
    <div className=" mx-auto max-w-[33.75rem] pb-14">
      <div className=" mb-14 flex w-full items-center justify-between">
        <LinkBtn iconColor="blue" isStretched href={`/feedback/${id}"`}>
          Go Backs
        </LinkBtn>
      </div>
      <FormFeedback request={feedback} />
    </div>
  );
};

export default EditFeedback;

import React from "react";
import LinkBtn from "@/components/common/LinkBtn";
import FormFeedback from "@/components/forms/FormFeedback";
import { fetchRequests } from "@/services/api";
import type { RequestType } from "@/types/dataTypes";

interface EditFeedbackProps {
  params: {
    id: string;
  };
}

const EditFeedback = async (props: EditFeedbackProps) => {
  const id = parseInt(props.params.id);
  const request: RequestType = await fetchRequests(id);

  return (
    <div>
      <div className=" mb-14 flex w-full items-center justify-between">
        <LinkBtn iconColor="blue" isStretched href={`/feedback/${id}"`}>
          Go Backs
        </LinkBtn>
      </div>
      <FormFeedback edit request={request} />
    </div>
  );
};

export default EditFeedback;
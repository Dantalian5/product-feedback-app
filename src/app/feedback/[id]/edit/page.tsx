import React from "react";

import toast from "react-hot-toast";
import { redirect } from "next/navigation";

import LinkBtn from "@/components/common/LinkBtn";
import FormFeedback from "@/components/forms/FormFeedback";
import { getFeedbackById } from "@/services/actions/feedbackActions";
interface EditFeedbackProps {
  params: {
    id: string;
  };
}
const EditFeedback = async (props: EditFeedbackProps) => {
  const id = parseInt(props.params.id);
  const feedback = await getFeedbackById(id);

  if (!feedback.isEditable) {
    toast.error("You can't edit this feedback");
    redirect("/");
  }

  return (
    <div className=" mx-auto max-w-[33.75rem] pb-14">
      <div className=" mb-14 flex w-full items-center justify-between">
        <LinkBtn href={`/feedback/${id}"`} classe="noneDark" icon>
          Go Backs
        </LinkBtn>
      </div>
      <FormFeedback oldFeedback={feedback} />
    </div>
  );
};

export default EditFeedback;

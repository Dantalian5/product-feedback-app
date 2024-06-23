import React from "react";
import toast from "react-hot-toast";
import LinkBtn from "@/components/common/LinkBtn";
import FormFeedback from "@/components/forms/FormFeedback";
import { getFeedbacks } from "@/services/api";
import { getSessionUser } from "@/services/userAuth";
import type { TypeFeedback } from "@/types/dataTypes";
import { redirect } from "next/navigation";
interface EditFeedbackProps {
  params: {
    id: string;
  };
}
const EditFeedback = async (props: EditFeedbackProps) => {
  const id = parseInt(props.params.id);
  const feedback: TypeFeedback = await getFeedbacks(id);
  const user = await getSessionUser();
  if (!user || !(feedback.user_id === Number(user.id))) {
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

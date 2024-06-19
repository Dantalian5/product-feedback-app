import React from "react";
import { auth } from "@/auth";
import LinkBtn from "@/components/common/LinkBtn";
import FormFeedback from "@/components/forms/FormFeedback";

const NewFeedback = async () => {
  const session = await auth();
  const user: any = session?.user || null;
  return (
    <div className=" mx-auto max-w-[33.75rem] pb-14">
      <div className=" mb-14 flex w-full items-center justify-between">
        <LinkBtn href="/" classe="noneDark" icon>
          Go Backs
        </LinkBtn>
      </div>
      <FormFeedback user={user} />
    </div>
  );
};

export default NewFeedback;

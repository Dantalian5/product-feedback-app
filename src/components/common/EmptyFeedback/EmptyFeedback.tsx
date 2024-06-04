import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";

const EmptyFeedback = () => {
  return (
    <div className="mb-4 rounded-10 bg-white px-6 py-20">
      <Image
        src="assets/svg/illustration-empty.svg"
        alt="Picture of the author"
        width={100}
        height={100}
        className="mx-auto mb-10 w-[40%]"
      />
      <h3 className="mx-auto mb-4 text-center text-18 font-bold text-dark-200">
        There is no feedback yet.
      </h3>
      <p className="mx-auto mb-6 text-center text-13 font-normal text-dark-100">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <div className="mx-auto w-fit">
        <Button color="violet" size="sm">
          + Add Feedback
        </Button>
      </div>
    </div>
  );
};

export default EmptyFeedback;

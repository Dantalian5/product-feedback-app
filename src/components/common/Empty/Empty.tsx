import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import LinkBtn from "../LinkBtn";

const Empty = () => {
  return (
    <div className="mb-4 rounded-10 bg-white px-6 py-20 sm:py-28">
      <Image
        src="assets/svg/illustration-empty.svg"
        alt="Picture of the author"
        width={100}
        height={100}
        className="mx-auto mb-10 w-[40%] max-w-[130px] sm:mb-14"
      />
      <h3 className="text-dark-700 mx-auto mb-4 text-center text-lg font-bold sm:text-2xl">
        There is no feedback yet.
      </h3>
      <p className="text-dark-600 mx-auto mb-6 max-w-[450px] text-center text-xs font-normal sm:mb-12 sm:text-base">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <div className="mx-auto w-fit">
        <LinkBtn href="/feedback/new" bgColor="violet" textColor="white">
          + Add Feedback
        </LinkBtn>
      </div>
    </div>
  );
};

export default Empty;

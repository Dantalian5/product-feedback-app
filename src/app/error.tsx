"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  React.useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className=" mx-auto max-w-[720px] rounded-10 bg-white px-6 py-20 sm:py-28">
      <Image
        src="/assets/svg/illustration-empty.svg"
        alt="Picture of the author"
        width={100}
        height={100}
        className="mx-auto mb-10 w-[40%] max-w-[130px] sm:mb-14"
      />
      <h3 className="mx-auto mb-4 text-center text-lg font-bold text-dark-700 sm:text-2xl">
        Ups!. Something went wrong...
      </h3>
      <p className="mx-auto mb-6 max-w-[450px] text-center text-xs font-normal text-dark-600 sm:mb-12 sm:text-base">
        Refresh the page, if the problem persist, please,{" "}
        <a href="https://marcosvalenzuela.netlify.app" className="underline">
          contact me
        </a>
        .
      </p>
      <div className="mx-auto w-fit">
        <Button classe="blue" onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default Error;

import React from "react";
import LinkBtn from "@/components/common/LinkBtn";
const NotFound = () => {
  return (
    <div className=" mx-auto max-w-[720px] rounded-10 bg-white px-6 py-20 sm:py-28">
      <p className=" text-dark-800 mx-auto text-center text-4xl font-bold">
        404
      </p>
      <h3 className="text-dark-700 mx-auto mb-4 text-center text-lg font-bold sm:text-2xl">
        Ups!. There is nothing to see here...
      </h3>
      <p className="text-dark-600 mx-auto mb-6 max-w-[450px] text-center text-xs font-normal sm:mb-12 sm:text-base">
        Please, go back to home, if you think this is an error,{" "}
        <a href="https://marcosvalenzuela.netlify.app" className="underline">
          contact me
        </a>
        .
      </p>
      <div className="mx-auto w-fit">
        <LinkBtn href="/" classe="violet">
          Go Home
        </LinkBtn>
      </div>
    </div>
  );
};

export default NotFound;

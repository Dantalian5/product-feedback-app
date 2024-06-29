import React from "react";
import LinkBtn from "@/components/common/LinkBtn";
import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";

const SignIn = async () => {
  return (
    <section className=" mx-auto max-w-[500px] pb-14">
      <div className=" mb-20 flex w-full items-center justify-between">
        <LinkBtn href="/" classe="noneDark" icon>
          Go Backs
        </LinkBtn>
      </div>
      <div className="relative w-full">
        <Image
          src="/assets/svg/favicon.svg"
          alt="Logo"
          width={80}
          height={80}
          className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2"
        />
        <LoginForm />
      </div>
    </section>
  );
};

export default SignIn;

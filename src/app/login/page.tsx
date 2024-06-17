import React from "react";
import LinkBtn from "@/components/common/LinkBtn";
import LoginForm from "@/components/forms/LoginForm";

const SignIn = async () => {
  return (
    <section className=" mx-auto max-w-[500px] pb-14">
      <div className=" mb-14 flex w-full items-center justify-between">
        <LinkBtn href="/" classe="noneDark" icon>
          Go Backs
        </LinkBtn>
      </div>
      <LoginForm />
    </section>
  );
};

export default SignIn;

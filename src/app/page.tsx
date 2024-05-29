import React from "react";
import Header from "@/components/layout/Header";
//----------
import Button from "@/components/common/Button/Button";
import CheckBox from "@/components/common/CheckBox/CheckBox";
import UpVote from "@/components/common/UpVote/UpVote";

const Home = () => {
  return (
    <div>
      <Header />
      <div className=" flex min-h-screen flex-col items-center justify-center gap-4">
        <Button color="blue">Button</Button>
        <CheckBox label="UX" />
        <UpVote />
      </div>
    </div>
  );
};

export default Home;

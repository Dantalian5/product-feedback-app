import React from "react";
import Header from "@/components/layout/Header";
//----------
import Button from "@/components/common/Button";
import CheckBox from "@/components/common/CheckBox";

const Home = () => {
  return (
    <div>
      <Header />
      <div className=" flex min-h-screen flex-col items-center justify-center gap-4">
        <Button color="blue">Button</Button>
        <CheckBox label="UX" />
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import Header from "@/components/layout/Header";
//----------
import Button from "@/components/common/Button";
import CheckBox from "@/components/common/CheckBox";

const Home = () => {
  return (
    <div>
      <Header />
      <div className=" flex min-h-screen items-center justify-center">
        <CheckBox label="All" />
      </div>
    </div>
  );
};

export default Home;

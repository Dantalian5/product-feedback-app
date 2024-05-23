import React from "react";
import Header from "@/components/layout/Header";
//----------
import Button from "@/components/common/Button";

const Home = () => {
  return (
    <div>
      <Header />
      <div className=" flex min-h-screen items-center justify-center">
        <Button icon="back" hoverUnderline>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Home;

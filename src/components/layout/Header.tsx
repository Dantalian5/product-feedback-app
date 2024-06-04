import React from "react";
import Hamburguer from "@/components/common/Hamburguer/Hamburguer";

const Header = () => {
  return (
    <header className="relative">
      <div className=" flex items-center justify-between bg-topgrad px-6 py-4">
        <div>
          <h1 className="text-base font-bold text-white">Frontend Mentor</h1>
          <span className="text-sm font-medium text-white/75">
            Feedback Board
          </span>
        </div>
        <Hamburguer />
      </div>
      <div className="absolute">
        <div className="">test</div>
      </div>
    </header>
  );
};

export default Header;

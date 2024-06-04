"use client";
import React from "react";
import Hamburguer from "@/components/common/Hamburguer";
import CheckBox from "@/components/common/CheckBox";
import { svgCircle } from "@/utils/svg/svgIcons";

const Header = () => {
  const filters = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="relative z-40">
      <div className="relative z-40 flex items-center justify-between bg-topgrad px-6 py-4">
        <div>
          <h1 className="text-base font-bold text-white">Frontend Mentor</h1>
          <span className="text-sm font-medium text-white/75">
            Feedback Board
          </span>
        </div>
        <Hamburguer isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div
        className={`absolute left-0 top-0 z-20 h-screen w-screen bg-black opacity-50 ${isOpen ? "block" : "hidden"}`}
      ></div>
      <div
        className={`absolute right-0 top-full z-30 flex min-h-screen flex-col gap-y-6 bg-gray-200 p-6 transition-transform ${isOpen ? " translate-x-0" : "translate-x-full"}`}
      >
        <div className="rounded-10 flex min-h-44 max-w-56 flex-wrap items-start justify-start gap-x-2 gap-y-4 bg-white p-6">
          {filters.map((item) => (
            <CheckBox key={item} label={item} />
          ))}
        </div>
        <div className="rounded-10  min-h-44 max-w-56 bg-white p-6">
          <div className="mb-6 flex w-full items-center justify-between">
            <h2 className=" text-18 font-bold tracking-tighter text-dark-200">
              Roadmap
            </h2>
            <button className="text-13 font-semibold text-blue-200 underline">
              View
            </button>
          </div>
          <div className="flex w-full flex-col gap-y-2">
            <div className="flex w-full items-center justify-start gap-x-4">
              <span className=" text-8 text-orange-100">{svgCircle}</span>
              <p className="text-base font-normal text-dark-100">Planned</p>
              <p className="ml-auto text-base font-bold text-dark-100">2</p>
            </div>
            <div className="flex w-full items-center justify-start gap-x-4">
              <span className=" text-8 text-violet">{svgCircle}</span>
              <p className="text-base font-normal text-dark-100">In-Progress</p>
              <p className="ml-auto text-base font-bold text-dark-100">3</p>
            </div>
            <div className="flex w-full items-center justify-start gap-x-4">
              <span className=" text-8 text-blue-100">{svgCircle}</span>
              <p className="text-base font-normal text-dark-100">Live</p>
              <p className="ml-auto text-base font-bold text-dark-100">1</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

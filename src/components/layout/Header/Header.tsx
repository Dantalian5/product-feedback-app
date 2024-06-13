"use client";
import React from "react";
import { nanoid } from "nanoid";
import Link from "next/link";
import Hamburguer from "@/components/common/Hamburguer";
import CheckBox from "@/components/common/CheckBox";
import { svgCircle } from "@/utils/svgIcons";
import { categories } from "@/config/globalVars";
import UserBtn from "@/components/common/UserBtn";

interface Roadmap {
  planned: number;
  in_progress: number;
  live: number;
}
interface HeaderProps {
  roadmap: Roadmap;
}
const Header = (props: HeaderProps) => {
  const { roadmap } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    document.body.style.overflowY = isOpen ? "auto" : "hidden";

    setIsOpen((prev) => !prev);
  };

  return (
    <header
      className={`relative z-20 w-full gap-x-2.5 sm:flex sm:items-stretch lg:flex-col lg:gap-y-6`}
    >
      <div className=" relative z-40 flex flex-[1_1_30%] items-center justify-between bg-topgrad px-6 py-4 sm:flex-grow sm:items-end sm:rounded-10 lg:min-h-36">
        <div>
          <h1 className="text-base font-bold text-white sm:text-xl">
            Frontend Mentor
          </h1>
          <span className="sm:text-md text-sm font-medium text-white/75">
            Feedback Board
          </span>
        </div>
        <Hamburguer isOpen={isOpen} onClick={handleClick} />
      </div>
      <div
        className={`absolute left-0 top-0 z-20 h-screen w-screen bg-black/50 ${isOpen ? "block" : "hidden"} sm:hidden`}
      ></div>
      <div
        className={`${isOpen ? " translate-x-0" : "translate-x-full"} absolute right-0 top-full z-30 flex h-[calc(100vh-5rem)] max-w-[270px] flex-[1_1_64%] flex-col gap-x-2.5 gap-y-6 overflow-y-scroll bg-gray-200 p-6 transition-transform sm:static sm:h-auto sm:max-w-none sm:translate-x-0 sm:flex-row sm:items-stretch sm:justify-stretch sm:bg-none sm:p-0 lg:flex-col`}
      >
        {/* <div className="ml-auto sm:order-last">
          <UserBtn />
        </div> */}
        <div className="flex min-h-44 w-full  flex-wrap items-start justify-start gap-x-2 gap-y-4 rounded-10 bg-white p-6 lg:max-w-none">
          {categories.map((item) => (
            <CheckBox key={nanoid()} label={item} />
          ))}
        </div>
        <div className="min-h-44 w-full  rounded-10 bg-white p-6 lg:max-w-none">
          <div className="mb-6 flex w-full items-center justify-between">
            <h2 className=" text-lg font-bold tracking-tighter text-dark-200">
              Roadmap
            </h2>
            <Link
              href={"/roadmap"}
              className="text-xs font-semibold text-blue-200 underline"
            >
              View
            </Link>
          </div>
          <div className="flex w-full flex-col gap-y-2">
            <div className="flex w-full items-center justify-start gap-x-4">
              <span className=" text-8 text-orange-100">{svgCircle}</span>
              <p className="text-base font-normal text-dark-100">Planned</p>
              <p className="ml-auto text-base font-bold text-dark-100">
                {roadmap.planned}
              </p>
            </div>
            <div className="flex w-full items-center justify-start gap-x-4">
              <span className=" text-8 text-violet">{svgCircle}</span>
              <p className="text-base font-normal text-dark-100">In-Progress</p>
              <p className="ml-auto text-base font-bold text-dark-100">
                {roadmap.in_progress}
              </p>
            </div>
            <div className="flex w-full items-center justify-start gap-x-4">
              <span className=" text-8 text-blue-100">{svgCircle}</span>
              <p className="text-base font-normal text-dark-100">Live</p>
              <p className="ml-auto text-base font-bold text-dark-100">
                {roadmap.live}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

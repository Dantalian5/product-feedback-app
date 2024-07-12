"use client";
import React from "react";

import Link from "next/link";

import Hamburguer from "@/components/common/Hamburguer";
import CheckBox from "@/components/common/CheckBox";
import { svgCircle } from "@/utils/svgIcons";
import UserBtn from "@/components/common/UserBtn";
import { useFilter } from "@/components/context/FilterProvider";

interface Roadmap {
  planned: number;
  inProgress: number;
  live: number;
}
interface HeaderProps {
  roadmap: Roadmap;
}
const Header = ({ roadmap }: HeaderProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { filters, setFilters, categories } = useFilter();

  const handleClick = () => {
    document.body.style.overflow = isOpen ? "auto" : "hidden";
    setIsOpen((prev) => !prev);
  };

  const total = roadmap.planned + roadmap.inProgress + roadmap.live;

  return (
    <header
      className={`relative z-20 w-full gap-x-2.5 sm:flex sm:items-stretch lg:flex-col lg:gap-y-6`}
    >
      <div className="relative z-40 flex flex-[1_1_30%] items-center justify-between px-6 py-4 sm:flex-grow sm:items-end sm:rounded-10 sm:p-6 lg:min-h-36">
        <div className="absolute inset-0 z-0 overflow-hidden bg-[url('/assets/background/mobile/background-header.png')] bg-[length:100%_100%] bg-no-repeat sm:rounded-10 sm:bg-[url('/assets/background/tablet/background-header.png')] lg:bg-[url('/assets/background/desktop/background-header.png')]"></div>
        <div className="relative">
          <h1 className="text-base font-bold text-white sm:text-xl">
            Frontend Mentor
          </h1>
          <span className="text-sm font-medium text-white/75 sm:text-md">
            Feedback Board
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="ml-auto sm:order-last">
            <UserBtn />
          </div>
          <Hamburguer isOpen={isOpen} onClick={handleClick} />
        </div>
      </div>
      <div
        className={`absolute left-0 top-0 z-20 h-screen w-screen bg-black/50 ${isOpen ? "block" : "hidden"} sm:hidden`}
      ></div>
      <div
        className={`${isOpen ? " translate-x-0" : "translate-x-full"} absolute right-0 top-full z-30 flex h-[calc(100vh-5rem)] max-w-[270px] flex-[1_1_64%] flex-col gap-x-2.5 gap-y-6 overflow-y-scroll bg-dark-200 p-6 transition-transform sm:static sm:h-auto sm:max-w-none sm:translate-x-0 sm:flex-row sm:items-stretch sm:justify-stretch sm:bg-none sm:p-0 lg:flex-col`}
      >
        <div className="flex min-h-44 w-full  flex-wrap items-start justify-start gap-x-2 gap-y-4 rounded-10 bg-white p-6 lg:max-w-none">
          {categories.map((value) => (
            <CheckBox
              key={value}
              label={value}
              filters={filters}
              setFilters={setFilters}
            />
          ))}
        </div>
        <div className="min-h-44 w-full  rounded-10 bg-white p-6 lg:max-w-none">
          <div className="mb-6 flex w-full items-center justify-between">
            <h2 className=" text-lg font-bold tracking-tighter text-dark-700">
              Roadmap
            </h2>
            <Link
              href={"/roadmap"}
              className={`${total === 0 && "opacity-25"} text-xs font-semibold text-blue-200 underline hover:text-blue-100`}
            >
              View
            </Link>
          </div>
          <div className="flex w-full flex-col gap-y-2">
            <div className="flex w-full items-center justify-start gap-x-4">
              <span className=" text-8 text-orange-100">{svgCircle}</span>
              <p className="text-base font-normal text-dark-600">Planned</p>
              <p className="ml-auto text-base font-bold text-dark-600">
                {roadmap.planned}
              </p>
            </div>
            <div className="flex w-full items-center justify-start gap-x-4">
              <span className=" text-8 text-violet-200">{svgCircle}</span>
              <p className="text-base font-normal text-dark-600">In-Progress</p>
              <p className="ml-auto text-base font-bold text-dark-600">
                {roadmap.inProgress}
              </p>
            </div>
            <div className="flex w-full items-center justify-start gap-x-4">
              <span className=" text-8 text-blue-100">{svgCircle}</span>
              <p className="text-base font-normal text-dark-600">Live</p>
              <p className="ml-auto text-base font-bold text-dark-600">
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

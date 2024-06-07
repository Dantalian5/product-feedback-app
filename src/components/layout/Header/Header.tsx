"use client";
import React from "react";
import { nanoid } from "nanoid";
import Link from "next/link";
import Hamburguer from "@/components/common/Hamburguer";
import CheckBox from "@/components/common/CheckBox";
import { svgCircle } from "@/utils/svgIcons";
import { categories } from "@/config/globalVars";

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
    <header className={`relative z-20 `}>
      <div className="relative z-40 flex items-center justify-between bg-topgrad px-6 py-4">
        <div>
          <h1 className="text-base font-bold text-white">Frontend Mentor</h1>
          <span className="text-sm font-medium text-white/75">
            Feedback Board
          </span>
        </div>
        <Hamburguer isOpen={isOpen} onClick={handleClick} />
      </div>
      <div
        className={`absolute left-0 top-0 z-20 h-screen w-screen bg-black/50 ${isOpen ? "block" : "hidden"}`}
      ></div>
      <div
        className={`absolute right-0 top-full z-30 flex h-[calc(100vh-5rem)] flex-col gap-y-6 bg-gray-200 p-6 transition-transform ${isOpen ? " translate-x-0" : "translate-x-full"} overflow-y-scroll`}
      >
        <div className="flex min-h-44 max-w-56 flex-wrap items-start justify-start gap-x-2 gap-y-4 rounded-10 bg-white p-6">
          {categories.map((item) => (
            <CheckBox key={nanoid()} label={item} />
          ))}
        </div>
        <div className="min-h-44  max-w-56 rounded-10 bg-white p-6">
          <div className="mb-6 flex w-full items-center justify-between">
            <h2 className=" text-18 font-bold tracking-tighter text-dark-200">
              Roadmap
            </h2>
            <Link
              href={"/roadmap"}
              className="text-13 font-semibold text-blue-200 underline"
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

"use client";
import React from "react";

import type { TypeOption as Option } from "@/types/dataTypes";
import { svgDownArrow, svgCheck } from "@/utils/svgIcons";

interface SortProps {
  options: Option[];
  selectedOption: Option;
  handleChange: (arg0: Option) => void;
}
const SortBy = ({ options, selectedOption, handleChange }: SortProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const componentId = React.useId();
  const componentRef = React.useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    handleChange(option);
    setIsOpen(false);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative z-10 w-fit" ref={componentRef}>
      <button
        id={componentId}
        type="button"
        aria-label="Sort by upvotes or comments"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-center gap-x-2 rounded-10 bg-dark-800 py-2 text-xs sm:text-sm`}
      >
        <span
          className={` text-sm font-normal text-dark-100 ${isOpen && "opacity-75"}`}
        >
          Sort by : <span className="font-bold">{selectedOption.label}</span>
        </span>
        <span className={`text-white ${!isOpen && "rotate-180"}`}>
          {svgDownArrow}
        </span>
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-labelledby={componentId}
          className="absolute top-[calc(100%+16px)] w-fit min-w-64 overflow-hidden rounded-10 bg-white shadow-custom_1"
        >
          {options.map((option) => (
            <button
              key={option.value}
              role="option"
              aria-selected={option.value === selectedOption.value}
              className="flex w-full cursor-pointer items-center justify-between border-b border-b-dark-700/15 px-6 py-3 text-base font-normal text-dark-600 last:border-b-0 hover:text-violet-200"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
              {option.value === selectedOption.value && svgCheck}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;

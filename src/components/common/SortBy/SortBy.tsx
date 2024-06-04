"use client";
import React from "react";
import { svgDownArrow, svgCheck } from "@/utils/svg/svgIcons";

interface Option {
  label: string;
  value: string;
}

const SortBy = () => {
  const options: Option[] = [
    { label: "Most Upvotes", value: "1sbmu" },
    { label: "Least Upvotes", value: "2sblu" },
    { label: "Most Comments", value: "3sbmc" },
    { label: "Least Comments", value: "4sblc" },
  ];
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const componentId = React.useId();

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-fit">
      <button
        id={componentId}
        type="button"
        aria-label="Sort by upvotes or comments"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`rounded-10 text-13 flex items-center justify-center gap-x-2 bg-dark-300 py-2 sm:text-sm`}
      >
        <span
          className={` text-sm font-normal text-gray-100 ${isOpen && "opacity-75"}`}
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
          className="rounded-10 shadow-custom_1 absolute top-[calc(100%+16px)] w-fit min-w-64 overflow-hidden bg-white"
        >
          {options.map((option) => (
            <button
              key={option.value}
              role="option"
              aria-selected={option.value === selectedOption.value}
              className="flex w-full cursor-pointer items-center justify-between border-b border-b-dark-200/15 px-6 py-3 text-base font-normal text-dark-100 last:border-b-0 hover:text-violet"
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

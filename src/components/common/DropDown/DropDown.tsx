"use client";
import React from "react";

const svgArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="9"
    height="7"
    viewBox="0 0 9 7"
    fill="none"
  >
    <path d="M1 6L5 2L9 6" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const svgCheck = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="11"
    viewBox="0 0 13 11"
    fill="none"
  >
    <path d="M1 5.23287L4.52154 9L12 1" stroke="#AD1FEA" stroke-width="2" />
  </svg>
);
interface DropDownProps {
  id: string;
  options: string[];
  value: string;
  onChange: (option: string) => void;
}
const DropDown = (props: DropDownProps) => {
  const { id, options, value, onChange } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const componentId = React.useId();

  const handleClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div id={id} className="relative w-full">
      <button
        id={componentId}
        type="button"
        aria-label="Select an option"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`custom-form-focus flex w-full items-center justify-between gap-x-4 rounded-5 bg-dark-200 px-4 py-3.5 sm:px-6`}
      >
        <span
          className={`sm:text-md text-dark-700 text-xs font-normal capitalize`}
        >
          {value}
        </span>
        <span className={`text-blue-200 ${!isOpen && "rotate-180"}`}>
          {svgArrow}
        </span>
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-labelledby={componentId}
          className="absolute top-[calc(100%+16px)] w-full min-w-64 overflow-hidden rounded-10 bg-white shadow-custom_1"
        >
          {options.map((option) => (
            <button
              key={option}
              role="option"
              aria-selected={option === value}
              className="hover:text-violet-200 text-dark-600 border-b-dark-700/15 flex w-full cursor-pointer items-center justify-between border-b px-6 py-3 text-base font-normal capitalize last:border-b-0"
              onClick={() => handleClick(option)}
            >
              {option}
              {option === value && svgCheck}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;

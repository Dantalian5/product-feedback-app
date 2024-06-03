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
interface Option {
  label: string;
  value: string;
}
interface DropDownProps {
  options: Option[];
  selectedOption: Option;
  setSelectedOption: (option: Option) => void;
}

const DropDown = (props: DropDownProps) => {
  const { options, selectedOption, setSelectedOption } = props;
  const [isOpen, setIsOpen] = React.useState(true);
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
        aria-label="Select an option"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`rounded-5 custom-form-focus flex items-center justify-center gap-x-4 bg-gray-200 px-6 py-3`}
      >
        <span className={` text-15 font-normal text-dark-200`}>
          {selectedOption.label}
        </span>
        <span className={`text-blue-200 ${!isOpen && "rotate-180"}`}>
          {svgArrow}
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

export default DropDown;

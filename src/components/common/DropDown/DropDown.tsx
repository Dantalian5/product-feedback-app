"use client";
import React from "react";
import { svgCheck, svgDownArrow as svgArrow } from "@/utils/svgIcons";

interface DropDownProps {
  id: string;
  options: string[];
  value: string;
  onChange: (event: { target: { value: string } }) => void;
}
const DropDown = (props: DropDownProps) => {
  const { id, options, value, onChange } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const componentId = React.useId();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setIsOpen(false);
    const event = {
      target: { value: option },
    };
    onChange(event);
  };
  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
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
    <div id={id} className="relative w-full" ref={dropdownRef}>
      <button
        id={componentId}
        type="button"
        aria-label="Select an option"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleButtonClick}
        className={`${isOpen && "custom-form-focus outline outline-1 outline-blue-200"} custom-form-focus z-30 flex w-full items-center justify-between gap-x-4 rounded-5 bg-dark-200 px-4 py-3.5 sm:px-6`}
      >
        <span
          className={`text-xs font-normal capitalize text-dark-700 sm:text-md`}
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
          className="absolute top-[calc(100%+16px)] z-50 w-full min-w-64 overflow-hidden rounded-10 bg-white shadow-custom_1"
        >
          {options.map((option) => (
            <button
              key={option}
              id={option}
              role="option"
              aria-selected={option.toLowerCase() === value.toLowerCase()}
              className="flex w-full cursor-pointer items-center justify-between border-b border-b-dark-700/15 px-6 py-3 text-base font-normal capitalize text-dark-600 last:border-b-0 hover:text-violet-200"
              onClick={() => handleOptionClick(option)}
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

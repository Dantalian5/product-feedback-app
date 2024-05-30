"use client";
import React from "react";

const avgArrow = (
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

const SortBy = () => {
  const options = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];
  const selectedOption = "Most Upvotes";
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative w-fit">
      <button
        type="button"
        aria-label="Sort by upvotes or comments"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`rounded-10 flex items-center justify-center gap-x-2 bg-dark-300 px-4 py-6 `}
      >
        <span
          className={` text-sm font-normal text-gray-100 ${isOpen && "opacity-75"}`}
        >
          Sort by : <span className="font-bold">{selectedOption}</span>
        </span>
        <span className={`text-white ${!isOpen && "rotate-180"}`}>
          {avgArrow}
        </span>
      </button>
    </div>
  );
};

export default SortBy;

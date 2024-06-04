"use client";
import React from "react";

interface HamburguerProps extends React.ComponentPropsWithRef<"button"> {
  isOpen: boolean;
}

const Hamburguer = (props: HamburguerProps) => {
  const { isOpen, onClick } = props;

  return (
    <button
      aria-label="Open menu"
      className={`z-50 flex cursor-pointer flex-col items-center justify-center gap-y-1 overflow-hidden p-1`}
      onClick={onClick}
    >
      <span
        className={`block h-[0.1875rem] w-[1.25rem] origin-left bg-white transition-all ${isOpen ? "rotate-45" : "rotate-0"}`}
      ></span>
      <span
        className={`block h-[0.1875rem] w-[1.25rem] origin-left bg-white transition-all ${isOpen ? "invisible translate-x-full" : "translate-x-0"}`}
      ></span>
      <span
        className={`block h-[0.1875rem] w-[1.25rem] origin-left bg-white transition-all ${isOpen ? "rotate-[-45deg]" : "rotate-0"}`}
      ></span>
    </button>
  );
};

export default Hamburguer;

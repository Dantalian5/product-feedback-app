"use client";
import React from "react";

const UserBtn = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <div className="relative h-fit w-fit">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-violet"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className="text-18 font-semibold text-white">A</p>
      </button>
      {isOpen && (
        <ul className="absolute right-0 top-[calc(100%+0.5rem)] z-50 flex flex-col gap-y-2 rounded-10 bg-white p-6 shadow-lg">
          <li className="text-15 font-bold text-dark-200">Dashboard</li>
          <li className="block h-[1px] w-full bg-gray-200"></li>
          <li className="text-15 font-bold text-dark-200">Log Out</li>
        </ul>
      )}
    </div>
  );
};

export default UserBtn;
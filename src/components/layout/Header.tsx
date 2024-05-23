import React from "react";

const Header = () => {
  return (
    <div className=" flex items-center justify-between bg-topgrad px-6 py-4">
      <div>
        <h1 className="text-base font-bold text-white">Frontend Mentor</h1>
        <span className="text-sm font-medium text-white/75">
          Feedback Board
        </span>
      </div>
      <div>
        <div className="hamburguer text-2xl text-white">
          <svg
            className="hamburger__box font-h2 font-h2--big"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect
              className="hamburger__line hamburger__top"
              width="20"
              height="2.5"
              x="2"
              y="4.75"
            ></rect>
            <rect
              className="hamburger__line hamburger__middle"
              width="20"
              height="2.5"
              x="2"
              y="10.75"
            ></rect>
            <rect
              className="hamburger__line hamburger__bottom"
              width="20"
              height="2.5"
              x="2"
              y="16.75"
            ></rect>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;

"use client";
import React from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

const UserBtn = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="relative z-20 h-fit w-fit">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-100"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className="text-dark-700 text-lg font-semibold">A</p>
      </button>
      {isOpen && (
        <ul className="absolute right-0 top-[calc(100%+0.5rem)] z-50 flex flex-col gap-y-2 rounded-10 bg-white p-6 shadow-lg">
          <li className="text-md text-dark-700 font-bold">Dashboard</li>
          <li className="bg-dark-700 block h-[1px] w-full"></li>
          <li className="text-md text-dark-700 font-bold">
            <button onClick={() => signOut({ callbackUrl: "/login" })}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserBtn;

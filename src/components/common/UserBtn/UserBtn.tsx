"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const UserBtn = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const logOut = async () => {
    await signOut();
  };

  return (
    <div className="relative z-20 h-fit w-fit">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-100"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className="text-lg font-semibold text-dark-700">A</p>
      </button>
      {isOpen && (
        <ul className="absolute right-0 top-[calc(100%+0.5rem)] z-50 flex flex-col gap-y-2 rounded-10 bg-white p-6 shadow-lg">
          <li className="text-md font-bold text-dark-700">
            <Link href={"/login"}>Login</Link>
          </li>
          <li className="block h-[1px] w-full bg-dark-700"></li>
          <li className="text-md font-bold text-dark-700">Dashboard</li>
          <li className="block h-[1px] w-full bg-dark-700"></li>
          <li className="text-md font-bold text-dark-700">
            <button onClick={() => logOut()}>Logout</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserBtn;

"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { svgUserIcon } from "@/utils/svgIcons";

const UserBtn = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { data } = useSession();
  const user = data?.user;
  const componentRef = React.useRef<HTMLDivElement>(null);
  const logOut = async () => {
    await signOut();
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
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
    <div className="relative z-20 h-fit w-fit" ref={componentRef}>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dark-800 bg-dark-100 shadow-sm"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={"user avatar"}
            width={40}
            height={40}
            className=" col-start-1 row-start-1 w-fit rounded-full"
          />
        ) : (
          <span className="text-2xl font-semibold text-dark-700">
            {svgUserIcon}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 flex flex-col gap-y-2 rounded-10 bg-white p-6 shadow-lg">
          {user ? (
            <>
              <Link
                href={"/dashboard"}
                className="text-md font-bold text-dark-700"
              >
                Settings
              </Link>
              <span className="h-[1px] w-full bg-dark-600/50"></span>
              <button
                onClick={() => logOut()}
                className="text-md font-bold text-dark-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href={"/login"} className="text-md font-bold text-dark-700">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default UserBtn;

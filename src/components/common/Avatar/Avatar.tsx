"use server";
import React from "react";
import Image from "next/image";
import { auth } from "@/auth";

const UserAvatar = async () => {
  const session: any = await auth();
  return (
    <div className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full bg-dark-100">
      {session?.user ? (
        <Image src={session.user.img} alt="User Avatar" />
      ) : (
        <p className="text-dark-700 text-lg font-semibold">A</p>
      )}
    </div>
  );
};

export default UserAvatar;

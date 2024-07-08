import React from "react";

import LinkBtn from "@/components/common/LinkBtn";
import UserSettings from "@/components/forms/UserSettings";
import UserPassword from "@/components/forms/UserPassword";
import { getUser } from "@/services/auth";

const Settings = async () => {
  const user = await getUser();
  return (
    <div className=" mx-auto max-w-[33.75rem] pb-14">
      <div className=" mb-14 flex w-full items-center justify-between">
        <LinkBtn href="/" classe="noneDark" icon>
          Go Backs
        </LinkBtn>
      </div>
      <UserSettings user={user as any} />
      <UserPassword />
      <span className="mx-auto my-2 block text-center text-xs text-dark-600">
        Please, logout and login again to see the changes
      </span>
    </div>
  );
};

export default Settings;

import React from "react";

import LinkBtn from "@/components/common/LinkBtn";
import UserSettings from "@/components/forms/UserSettings";
import { getSessionUser } from "@/services/userAuth";
import type { TypeUser } from "@/types/dataTypes";

const Settings = async () => {
  const user = await getSessionUser();
  return (
    <div className=" mx-auto max-w-[33.75rem] pb-14">
      <div className=" mb-14 flex w-full items-center justify-between">
        <LinkBtn href="/" classe="noneDark" icon>
          Go Backs
        </LinkBtn>
      </div>
      <UserSettings user={user as any} />
    </div>
  );
};

export default Settings;

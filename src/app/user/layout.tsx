import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return <section className="px-6 pb-20 pt-6 sm:p-0">{children}</section>;
};

export default UserLayout;

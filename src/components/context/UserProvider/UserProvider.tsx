"use client";
import { createContext, useContext } from "react";
import type { TypeUser } from "@/types/dataTypes";

// Create Context object.
export const UserContext = createContext<TypeUser | null>(null);

const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: TypeUser | null;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

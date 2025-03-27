import React, { createContext, useState, ReactNode } from "react";
import { UserType } from "../library/types";

// Define the context value type
type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

// Define the context props type
type UserContextProps = {
  children: ReactNode;
};

// Create the context with a default value (set to null or empty structure)
export const UserDataContext = createContext<UserContextType | undefined>(
  undefined
);

const UserContext = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<UserType | null>(null); // User data

  return (
    //   Provide the context value
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;

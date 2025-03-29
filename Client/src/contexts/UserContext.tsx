import React, { createContext, useState, ReactNode } from "react";
import { SchemaAdditions, UserType } from "../library/types";

// Mongoose Schema Additions for User
type MongooseUserSchemaType = UserType & Partial<SchemaAdditions>;

// Define the context value type
type UserContextType = {
  user: MongooseUserSchemaType | null | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<MongooseUserSchemaType | null | undefined>
  >;
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
  const [user, setUser] = useState<MongooseUserSchemaType | null | undefined>(
    null
  ); // User data

  return (
    //   Provide the context value
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;

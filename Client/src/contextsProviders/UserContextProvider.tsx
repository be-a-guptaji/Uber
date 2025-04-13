import { useState, ReactNode } from "react";
import { SchemaAdditions, UserType } from "../library/types";
import { UserDataContext } from "../contexts/UserDataContext";

type MongooseUserSchemaType = UserType & Partial<SchemaAdditions>;

type UserContextProps = {
  children: ReactNode;
};

const UserContext = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<MongooseUserSchemaType | null | undefined>(
    null
  );

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;

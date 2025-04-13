import { createContext } from "react";
import { SchemaAdditions, UserType } from "../library/types";

type MongooseUserSchemaType = UserType & Partial<SchemaAdditions>;

export type UserContextType = {
  user: MongooseUserSchemaType | null | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<MongooseUserSchemaType | null | undefined>
  >;
};

export const UserDataContext = createContext<UserContextType | undefined>(
  undefined
);

import React, { createContext, useState, ReactNode } from "react";
import { SchemaAdditions, CaptainType } from "../library/types";

// Mongoose Schema Additions for Captain
type MongooseCaptainSchemaType = CaptainType & SchemaAdditions;

// Define the context value type
type CaptainContextType = {
  captain: MongooseCaptainSchemaType | null | undefined;
  setCaptain: React.Dispatch<
    React.SetStateAction<MongooseCaptainSchemaType | null | undefined>
  >;
};

// Define the context props type
type CaptainContextProps = {
  children: ReactNode;
};

// Create the context with a default value (set to null or empty structure)
export const CaptainDataContext = createContext<CaptainContextType | undefined>(
  undefined
);

const CaptainContext = ({ children }: CaptainContextProps) => {
  const [captain, setCaptain] = useState<
    MongooseCaptainSchemaType | null | undefined
  >(null); // Captain data

  return (
    //   Provide the context value
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;

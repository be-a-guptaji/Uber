import { createContext } from "react";
import { SchemaAdditions, CaptainType } from "../library/types";

// Mongoose Schema Additions for Captain
type MongooseCaptainSchemaType = CaptainType & Partial<SchemaAdditions>;

export type CaptainContextType = {
  captain: MongooseCaptainSchemaType | null | undefined;
  setCaptain: React.Dispatch<
    React.SetStateAction<MongooseCaptainSchemaType | null | undefined>
  >;
};

// Create the context (with no default value)
export const CaptainDataContext = createContext<CaptainContextType | undefined>(
  undefined
);

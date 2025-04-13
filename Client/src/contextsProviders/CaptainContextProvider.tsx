import { CaptainDataContext } from "../contexts/CaptainDataContext";
import { SchemaAdditions, CaptainType } from "../library/types";
import { ReactNode, useState } from "react";

type CaptainContextProps = {
  children: ReactNode;
};

type MongooseCaptainSchemaType = CaptainType & Partial<SchemaAdditions>;

const CaptainContextProvider = ({ children }: CaptainContextProps) => {
  const [captain, setCaptain] = useState<
    MongooseCaptainSchemaType | null | undefined
  >(null);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContextProvider;

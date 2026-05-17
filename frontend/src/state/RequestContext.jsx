import { createContext, useContext, useMemo, useState } from "react";

const RequestContext = createContext(null);

const initialQuote = {
  sealType: "",
  quotePath: "",
  materialCode: "",
  drawingNumber: "",
  pumpManufacturer: "",
  pumpModel: "",
  serialNumber: "",
  fluid: "",
  pressure: "",
  temperature: "",
  shaftSize: "",
  sealArrangement: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  company: "",
  notes: "",
  submittedTo: "",
};

export function RequestProvider({ children }) {
  const [quoteData, setQuoteData] = useState(initialQuote);

  const value = useMemo(
    () => ({
      quoteData,
      setQuoteData,
      resetQuote: () => setQuoteData(initialQuote),
    }),
    [quoteData]
  );

  return <RequestContext.Provider value={value}>{children}</RequestContext.Provider>;
}

export function useRequestContext() {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error("useRequestContext must be used inside RequestProvider");
  }
  return context;
}

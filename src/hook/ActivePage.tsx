"use client"
import { createContext, ReactNode, useContext, useState } from "react";

// Define the shape of the context data
interface ActivePageContextData {
  activePage: string;
  setActivePage: (value: string) => void;
}

// Create the context for active page
const ActivePageContext = createContext<ActivePageContextData | undefined>(
  undefined
);

// Create provider for this context
export const ActivePageProvider = ({ children }: { children: ReactNode }) => {
  const [activePage, setActivePage] = useState<string>("home");

  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </ActivePageContext.Provider>
  );
};

// Custom hook to use the context
export const useActivePage = () => {
  const context = useContext(ActivePageContext);
  if (!context) {
    throw new Error("useActivePage must be used within an ActivePageProvider");
  }
  return context;
};

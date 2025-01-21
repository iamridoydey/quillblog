"use client"
import React, { createContext, useContext, ReactNode, useState } from "react";

// Define the shape of the context
interface ActiveMiniNav {
  activeMiniNav: string;
  setActiveMiniNav: (navItem: string) => void;
}

// Create the context with a default value
const ActiveMiniNavContext = createContext<ActiveMiniNav | undefined>(
  undefined
);

export const ActiveMiniNavProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeMiniNav, setActiveMiniNav] = useState<string>("");

  return (
    <ActiveMiniNavContext.Provider value={{ activeMiniNav, setActiveMiniNav }}>
      {children}
    </ActiveMiniNavContext.Provider>
  );
};

// Custom hook to use the context
export const useActiveMiniNavItem = () => {
  const context = useContext(ActiveMiniNavContext);
  if (!context) {
    throw new Error(
      "useActiveMiniNavItem must be used within an ActiveMiniNavProvider"
    );
  }
  return context;
};

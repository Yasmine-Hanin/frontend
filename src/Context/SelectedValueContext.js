import React, { createContext, useState } from "react";

export const SelectedValueContext = createContext(null);

export const SelectedValueProvider = ({ children }) => {
  const [selectedValue, setSelectedValue] = useState("terrain-background");

  return (
    <SelectedValueContext.Provider value={{ selectedValue, setSelectedValue }}>
      {children}
    </SelectedValueContext.Provider>
  );
};

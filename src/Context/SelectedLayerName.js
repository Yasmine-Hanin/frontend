import React, { createContext, useState } from "react";

export const SelectedLayerNameContext = createContext(null);

export const SelectedLayerNameProvider = ({ children }) => {
  const [selectedLayerName, setSelectedLayerName] = useState("");

  return (
    <SelectedLayerNameContext.Provider
      value={{ selectedLayerName, setSelectedLayerName }}
    >
      {children}
    </SelectedLayerNameContext.Provider>
  );
};

import React, { createContext, useState } from "react";

export const CurrentBseLayerContext = createContext(null);

export const CurrentBseLayerProvider = ({ children }) => {
  const [currentBseLayer, setCurrentBseLayer] = useState("osm");

  return (
    <CurrentBseLayerContext.Provider
      value={{ currentBseLayer, setCurrentBseLayer }}
    >
      {children}
    </CurrentBseLayerContext.Provider>
  );
};

import React, { createContext, useContext, useState } from "react";

const MarkerStateContext = createContext();

export const useSharedState = () => {
  return useContext(MarkerStateContext);
};

export const SharedStateProvider = ({ children }) => {
  const [markers, setMarkers] = useState([]);

  const updateValue = (newValue) => {
    setMarkers(newValue);
  };

  return <MarkerStateContext.Provider value={{ markers, updateValue }}>{children}</MarkerStateContext.Provider>;
};

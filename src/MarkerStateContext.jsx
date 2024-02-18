import React, { createContext, useContext, useState } from "react";

const MarkerStateContext = createContext();

export const useSharedState = () => {
  return useContext(MarkerStateContext);
};

export const SharedStateProvider = ({ children }) => {
  const [markers, setMarkers] = useState([]);
  const [markerIndex, setMarkerIndex] = useState(1);

  const updateValue = (newValue) => {
    setMarkers(newValue);
  };

  const updateMarkerIndex = (newIndex) => {
    setMarkerIndex(newIndex);
  };

  // Provide both markers and markerIndex, along with their update functions, to the context
  return (
    <MarkerStateContext.Provider value={{ markers, updateValue, markerIndex, updateMarkerIndex }}>
      {children}
    </MarkerStateContext.Provider>
  );
};

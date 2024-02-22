import React, { createContext, useContext, useState } from "react";

const MarkerStateContext = createContext();

export const useSharedState = () => {
  return useContext(MarkerStateContext);
};

export const SharedStateProvider = ({ children }) => {
  const [markers, setMarkers] = useState([]);
  const [markerIndex, setMarkerIndex] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editButtonActive, setEditButtonActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const [isSharedLink, setIsSharedLink] = useState(false);
  const [sharedMarkers, setSharedMarkers] = useState([
    { latitude: 59.51196696926434, longitude: 17.87826461643578, info: "Bajs" },
    { latitude: 59.71196696926434, longitude: 17.87826461643578, info: "Piss" },
    { latitude: 59.61196696926434, longitude: 17.87826461643578, info: "Korv" },
  ]);
  const [newSharingObject, setNewSharingObject] = useState({});
  const [tagInformation, setTagInformation] = useState({});

  return (
    <MarkerStateContext.Provider
      value={{
        markers,
        setMarkers,
        markerIndex,
        setMarkerIndex,
        isModalOpen,
        setIsModalOpen,
        editButtonActive,
        setEditButtonActive,
        modalContent,
        setModalContent,
        editIndex,
        setEditIndex,
        isMobile,
        setIsMobile,
        isSharedLink,
        setIsSharedLink,
        sharedMarkers,
        setSharedMarkers,
        newSharingObject,
        setNewSharingObject,
        tagInformation,
        setTagInformation,
      }}
    >
      {children}
    </MarkerStateContext.Provider>
  );
};

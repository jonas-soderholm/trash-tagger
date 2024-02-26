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
  const [modalContent, setModalContent] = useState();
  const [editIndex, setEditIndex] = useState(0);
  const [isSharedLink, setIsSharedLink] = useState(false);
  const [sharedMarkers, setSharedMarkers] = useState([]);
  const [newSharingObject, setNewSharingObject] = useState({});
  const [tagInformation, setTagInformation] = useState({});
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [mapArray, setMapArray] = useState([]);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        markersLoaded,
        setMarkersLoaded,
        mapArray,
        setMapArray,
        rememberMe,
        setRememberMe,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </MarkerStateContext.Provider>
  );
};

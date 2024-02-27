import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useSharedState } from "../SharedContext.jsx";
import { Routes, Route } from "react-router-dom";
import { DeleteMarker } from "./Map";
import { maxAmmountOfTags } from "./Map";
import ViewMobileMain from "./ViewMobile";
import ViewDesktopMain from "./ViewDesktop";
import LoginForm from "./LoginForm";
import NotFoundPage from "./NotFoundPage";

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const { markers, setMarkers } = useSharedState();
  const { markerIndex, setMarkerIndex } = useSharedState();
  const { isMobile, setIsMobile } = useSharedState();
  const { /*sharedMarkers,*/ setSharedMarkers } = useSharedState();
  const { mapArray, setMapArray } = useSharedState();
  const { isSharedLink, setIsSharedLink } = useSharedState();
  const { isLoggedIn, setIsLoggedIn } = useSharedState();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    console.log("token start: ", token);

    if (token) {
      setIsLoggedIn(true);
      console.log("token start: ", token);
    }

    // Check if the URL includes "share" to determine if it's a shared link
    const checkIfSharedLink = () => {
      const urlContainsShare = window.location.href.includes("shared-markers?groupId");
      setIsSharedLink(urlContainsShare);
    };

    checkIfSharedLink();
  }, [setIsSharedLink]);

  function handleDeleteClick(_, index) {
    const newArray = [...mapArray];
    newArray.splice(index, 1);
    setMapArray(newArray);
    setMarkers(index);
    DeleteMarker(markers, setMarkers, index);

    setMarkerIndex(newArray.length + 1);
    updateMarkersAfterRemoval(index);

    function updateMarkersAfterRemoval(removedIndex) {
      for (let i = 0; i <= maxAmmountOfTags; i++) {
        const markerElement = document.getElementById(`marker-${i}`);
        if (markerElement) {
          const currentMarkerNumber = parseInt(markerElement.id.replace("marker-", ""), 10);

          if (currentMarkerNumber > removedIndex) {
            markerElement.textContent = currentMarkerNumber - 1;
            markerElement.id = `marker-${currentMarkerNumber - 1}`;
          }
        }
      }
    }

    // Update shared after delete
    setSharedMarkers((prevSharedMarkers) => {
      // Create a new array excluding the item at the specified index
      const filteredMarkers = prevSharedMarkers.filter((_, itemIndex) => itemIndex !== index);
      return filteredMarkers;
    });
  }

  function handleMapClicks(index, info) {
    setMapArray((prevMapArray) => [...prevMapArray, info]);
  }

  function CloseModalWindow() {
    setIsModalOpen(false);
    setModalContent("");
  }

  function ModalEditSubmit() {
    if (editIndex >= 0 && editIndex < mapArray.length) {
      let EditElement = document.querySelector(`.button-${editIndex}`);
      if (EditElement) {
        EditElement.textContent = modalContent;
      }
      mapArray[editIndex] = modalContent;
    }
    setIsModalOpen(false);

    setSharedMarkers((prevSharedMarkers) => {
      if (prevSharedMarkers.length === 0) return [];

      const updatedMarkers = [...prevSharedMarkers];

      updatedMarkers[editIndex] = {
        ...prevSharedMarkers[editIndex],
        info: modalContent,
      };

      return updatedMarkers;
    });

    setModalContent("");
  }

  function handleEditClick(index) {
    setEditIndex(index);
    setIsModalOpen(true);
  }

  const viewProps = {
    isModalOpen,
    CloseModalWindow,
    ModalEditSubmit,
    modalContent,
    setModalContent,
    handleMapClicks,
    mapArray,
    markerIndex,
    handleEditClick,
    handleDeleteClick,
  };

  console.log(isSharedLink);

  if (!isLoggedIn && !isSharedLink) {
    return <LoginForm />;
  }

  return (
    <Routes>
      <Route path="/" element={isMobile ? <ViewMobileMain {...viewProps} /> : <ViewDesktopMain {...viewProps} />} />

      <Route
        path="/shared-markers"
        element={isMobile ? <ViewMobileMain {...viewProps} /> : <ViewDesktopMain {...viewProps} />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
  //return isMobile ? <ViewMobileMain {...viewProps} /> : <ViewDesktopMain {...viewProps} />;
}

export default MainPage;

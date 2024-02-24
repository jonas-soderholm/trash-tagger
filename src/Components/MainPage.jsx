import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useSharedState } from "../SharedContext.jsx";
import { DeleteMarker } from "./Map";
import { maxAmmountOfTags } from "./Map";
import ViewMobileMain from "./ViewMobile";
import ViewDesktopMain from "./ViewDesktop";

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const { markers, setMarkers } = useSharedState();
  const { markerIndex, setMarkerIndex } = useSharedState();
  const { isMobile, setIsMobile } = useSharedState();
  const { sharedMarkers, setSharedMarkers } = useSharedState();
  const { mapArray, setMapArray } = useSharedState();

  // Resize if phone window update
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // Resize inner window for mobile
  useEffect(() => {
    const adjustHeight = () => {
      // Only adjust height if on mobile
      if (isMobile) {
        const mainContainer = document.querySelector(".main-container");
        if (mainContainer) {
          mainContainer.style.height = `${window.innerHeight}px`;
        }
      }
    };

    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  });

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

  return isMobile ? <ViewMobileMain {...viewProps} /> : <ViewDesktopMain {...viewProps} />;
}

export default MainPage;

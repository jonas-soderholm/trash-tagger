import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useSharedState } from "../SharedContext.jsx";
import { DeleteMarker } from "./Map";
import { maxAmmountOfTags } from "./Map";
import Map from "./Map";
import Modal from "./Modal.jsx";
import BackendTesting from "./BackendTesting.jsx";
import ShareMarkersButton from "./ShareMarkersButton.jsx";
import HeaderAndLogo from "./HeaderAndLogo";
import ButtonsForSavedTags from "./ButtonsForSavedTags";

function MainPage() {
  const [mapArray, setMapArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const { markers, setMarkers } = useSharedState();
  const { markerIndex, setMarkerIndex } = useSharedState();
  const { isMobile, setIsMobile } = useSharedState();
  const { sharedMarkers, setSharedMarkers } = useSharedState();

  const { isSharedLink, setIsSharedLink } = useSharedState();

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
    // AddMarkerInformationOnClick(index, info);
    setMapArray((prevMapArray) => [...prevMapArray, info]);
  }

  // function AddMarkerInformationOnClick(index, info) {
  //   setMapArray((prevMapArray) => [...prevMapArray, info]);
  // }

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

      // Create a new array by copying the previous state
      const updatedMarkers = [...prevSharedMarkers];

      // Update the item at editIndex with new information
      updatedMarkers[editIndex] = {
        ...prevSharedMarkers[editIndex],
        info: modalContent, // Assume modalContent contains the updated info
      };

      return updatedMarkers;
    });

    setModalContent("");
  }

  function handleEditClick(index) {
    setEditIndex(index);
    setIsModalOpen(true);
  }

  return (
    <>
      {isMobile ? (
        <>
          {/* Mobile version */}
          {/* Pop-up Modal */}
          <div className="main-container h-screen flex flex-col">
            {/* Pop-up Modal */}
            <Modal
              isOpen={isModalOpen}
              onClose={CloseModalWindow}
              onSubmit={ModalEditSubmit}
              content={modalContent}
              setContent={setModalContent}
            />
            {/* Main site visual */}
            <div className="flex-1 h-[100vh]">
              {/* Render leaflet map */}
              <Map onAddMark={handleMapClicks} />
            </div>
            {/* Bottom part */}

            <ButtonsForSavedTags
              mapArray={mapArray}
              markerIndex={markerIndex}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          </div>
        </>
      ) : (
        <>
          {/* PC */}
          {/* Pop-up Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={CloseModalWindow}
            onSubmit={ModalEditSubmit}
            content={modalContent}
            setContent={setModalContent}
          />
          {/* Main site visual */}
          <div className="main-container flex m-[2vh] rounded-lg h-[96vh] gap-4">
            {/* Desktop-specific components */}
            <div className="left-part w-1/3 bg-slate-700 rounded-lg ">
              <HeaderAndLogo />
              <ButtonsForSavedTags
                mapArray={mapArray}
                markerIndex={markerIndex}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
              <ShareMarkersButton />
              <BackendTesting />
            </div>

            <div className="right-part md:w-2/3 rounded-lg">
              {/* Render lealet map */}
              <Map onAddMark={handleMapClicks} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MainPage;

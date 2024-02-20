import React, { useState, useMemo, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useSharedState } from "../SharedContext.jsx";
import { DeleteMarker } from "./Map";
import { maxAmmountOfTags } from "./Map";
import Map from "./Map";
import Modal from "./Modal.jsx";
import ShareTagsButton from "./ShareTagsButton";
import HeaderAndLogo from "./HeaderAndLogo";
import ButtonsForSavedTags from "./ButtonsForSavedTags";
export let isMobile = window.innerWidth <= 768;

function MainPage() {
  const [mapArray, setMapArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const center = useMemo(() => [59.5099648, 17.8847744], []);
  const zoom = useMemo(() => 13, []);
  const { markers, setMarkers } = useSharedState();
  const { markerIndex, setMarkerIndex } = useSharedState();

  // If user resizes window
  useEffect(() => {
    function handleResize() {
      isMobile = window.innerWidth <= 768;
    }

    // Update isMobile state on resize
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    // Adjust the height on initial load and window resize
    adjustHeight();
    window.addEventListener("resize", adjustHeight);

    // Clean up
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

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
  }

  function handleMapClicks(index, info) {
    AddMarkerInformationOnClick(index, info);
  }

  function AddMarkerInformationOnClick(_, info) {
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
          <div className="main-container bg-red-500 h-screen flex flex-col">
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
              <Map center={center} zoom={zoom} onAddMark={handleMapClicks} />
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
          <div className="main-container md:flex md:flex-row bg-[#46664200] m-[2vh] rounded-lg h-[96vh] gap-4">
            {/* Desktop-specific components */}
            <div className="left-part md:w-1/3 bg-slate-700 rounded-lg ">
              <HeaderAndLogo />
              <ButtonsForSavedTags
                mapArray={mapArray}
                markerIndex={markerIndex}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
              <ShareTagsButton />
            </div>
            <div className="right-part md:w-2/3 bg-slate-500 rounded-lg">
              {/* Render lealet map */}
              <Map center={center} zoom={zoom} onAddMark={handleMapClicks} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MainPage;

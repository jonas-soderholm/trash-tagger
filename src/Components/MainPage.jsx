import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { useSharedState } from "../MarkerStateContext.jsx";
import { DeleteMarker } from "./Map";
import Map from "./Map";
import Modal from "./Modal.jsx";
import EditAndDeleteButtonActions from "./EditAndDeleteButtonActions";
import ShareTagsButton from "./ShareTagsButton";
import HeaderAndLogo from "./HeaderAndLogo";
import ButtonsForSavedTags from "./ButtonsForSavedTags";

function MainPage() {
  const [mapArray, setMapArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const center = useMemo(() => [59.5099648, 17.8847744], []);
  const zoom = useMemo(() => 13, []);
  const { markers, updateValue } = useSharedState();
  const { markerIndex, updateMarkerIndex } = useSharedState();

  function handleDeleteClick(_, index) {
    const newArray = [...mapArray];
    newArray.splice(index, 1);
    setMapArray(newArray);
    DeleteMarker(markers, updateValue, index);

    updateMarkerIndex(newArray.length + 1);
    updateMarkersAfterRemoval(index);

    function updateMarkersAfterRemoval(removedIndex) {
      for (let i = 0; i <= 6; i++) {
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
    let EditElement = document.querySelector(`.button-${editIndex}`).textContent;

    if (mapArray[editIndex] && EditElement) {
      mapArray[editIndex] = modalContent;
      EditElement = modalContent;
    }
    setIsModalOpen(false);
    setModalContent("");
  }

  function handleEditClick(index) {
    setEditIndex(index);
    setIsModalOpen(true);
  }

  function ButtonsForSavedTags() {
    return (
      <>
        <div className="Header bg-[#cd3a3a00] text-2xl pt-5 px-10 text-slate-200 text-center">
          {mapArray.length !== 0 ? `Current tags: ${markerIndex - 1}` : "Click on map to tag trash"}
        </div>
        <div className="button-container-2 mx-auto bg-[#a98c3600] rounded-lg gap-3  max-w-[45rem] pt-10 ">
          <div className="button-container-1 maps overflow-x-hidden text-2xl rounded-[45px] bg-[#5d5a5a] max-h-[20rem] mx-5 text-slate-200">
            {mapArray.map((names, i) => {
              return (
                <EditAndDeleteButtonActions
                  key={i}
                  info={i + 1 + ": " + names}
                  index={i}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Pop-up Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={CloseModalWindow}
        onSubmit={ModalEditSubmit}
        content={modalContent}
        setContent={setModalContent}
      />
      {/* Main site visual */}
      <div className="main-container md:flex md:flex-row  bg-[#46664200] m-[2vh] rounded-lg h-[96vh] gap-4">
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
  );
}

export default MainPage;

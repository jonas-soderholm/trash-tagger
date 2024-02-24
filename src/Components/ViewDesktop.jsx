import React from "react";
import Modal from "./Modal";
import Map from "./Map";
import ButtonsMarker from "./ButtonsMarker.jsx"; // Ensure correct import
import HeaderAndLogo from "./HeaderAndLogo";
import ButtonShareMarkers from "./ButtonShareMarkers";

// Correctly receive props passed from MainPage
const ViewDesktopMain = ({
  isModalOpen,
  CloseModalWindow, // Ensure naming matches the MainPage prop
  ModalEditSubmit, // Ensure naming matches the MainPage prop
  modalContent,
  setModalContent,
  handleMapClicks,
  mapArray,
  markerIndex,
  handleEditClick,
  handleDeleteClick,
}) => (
  <>
    <Modal
      isOpen={isModalOpen}
      onClose={CloseModalWindow}
      onSubmit={ModalEditSubmit}
      content={modalContent}
      setContent={setModalContent}
    />
    <div className="main-container flex m-[2vh] rounded-lg h-[96vh] gap-4">
      <div className="left-part w-1/3 bg-slate-700 rounded-lg">
        <HeaderAndLogo />
        <ButtonsMarker
          mapArray={mapArray}
          markerIndex={markerIndex}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
        <ButtonShareMarkers />
      </div>
      <div className="right-part md:w-2/3 rounded-lg">
        <Map onAddMark={handleMapClicks} />
      </div>
    </div>
  </>
);

export default ViewDesktopMain;

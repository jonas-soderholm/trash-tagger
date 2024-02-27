import React from "react";
import Modal from "./Modal";
import Map from "./Map";
import ButtonsMarker from "./ButtonsMarker.jsx"; // Ensure correct import
import HeaderAndLogo from "./HeaderAndLogo";
import ButtonShareMarkers from "./ButtonShareMarkers";
import { useSharedState } from "../SharedContext.jsx";
import { useHref } from "react-router-dom";

// Correctly receive props passed from MainPage
const ViewDesktopMain = (props) => {
  const { isSharedLink, setIsSharedLink } = useSharedState();

  const {
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
  } = props;

  function UpdateSite() {
    console.log("signOut");
    window.location.href = "http://localhost:3000/";
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={CloseModalWindow}
        onSubmit={ModalEditSubmit}
        content={modalContent}
        setContent={setModalContent}
      />
      <div className="main-container flex m-[2vh] h-[96vh] gap-4">
        <div className="left-part w-1/3 background-color rounded-xl">
          <HeaderAndLogo />
          <ButtonsMarker
            mapArray={mapArray}
            markerIndex={markerIndex}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
          <ButtonShareMarkers />
        </div>
        <div className="right-part flex md:w-2/3 items-center rounded-lg">
          <button
            onClick={() => UpdateSite()}
            className="sign-out-button absolute button-container-color z-[1005] top-0 rounded-sm body-font right-0 m-8 items-center text-center p-[6px] text-[12px]"
          >
            {isSharedLink ? "Sign in to tag!" : "Sign out"}
          </button>
          <Map onAddMark={handleMapClicks} />
        </div>
      </div>
    </>
  );
};

export default ViewDesktopMain;

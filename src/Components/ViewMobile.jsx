import React from "react";
import Modal from "./Modal";
import Map from "./Map";
import ButtonsMarker from "./ButtonsMarker.jsx"; // Ensure correct import
import { useSharedState } from "../SharedContext.jsx";

// Adapt this structure for the mobile-specific layout and functionality
const ViewMobileMain = (props) => {
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

  function SignOut() {
    console.log("signOut");
    window.location.href = "http://localhost:3000/";
  }

  function SignIn() {
    console.log("signIn");
    window.location.href = "http://localhost:3000/";
  }

  return (
    <>
      <div className="main-container h-screen flex flex-col">
        <Modal
          isOpen={isModalOpen}
          onClose={CloseModalWindow}
          onSubmit={ModalEditSubmit}
          content={modalContent}
          setContent={setModalContent}
        />
        {/* Additional mobile-specific layout and components */}
        <button
          onClick={() => (isSharedLink ? SignIn() : SignOut())}
          className="sign-out-button absolute button-container-color z-[1005] top-0 rounded-sm body-font right-0 m-8 items-center text-center p-[6px] text-[12px]"
        >
          {isSharedLink ? "Sign in to tag!" : "Sign out"}
        </button>
        <Map onAddMark={handleMapClicks} />
        <ButtonsMarker
          mapArray={mapArray}
          markerIndex={markerIndex}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
        {/* Possibly more mobile-specific components */}
      </div>
    </>
  );
};
export default ViewMobileMain;

import React from "react";
import ButtonsEditDelete from "./ButtonsEditDelete.jsx";
import HeaderAndLogo from "../view/HeaderAndLogo.jsx";
import ButtonShareMarkers from "./ButtonShareMarkers.jsx";
import { useSharedState } from "../../SharedContext.jsx";

function ButtonsMarker({ mapArray, markerIndex, handleEditClick, handleDeleteClick }) {
  const { isMobile } = useSharedState();
  const { isSharedLink } = useSharedState();
  const { sharedMarkers } = useSharedState();

  return (
    <>
      {isMobile ? (
        <>
          <div className="button-container-2 background-color overflow-hidden mx-auto gap-2 p-2 w-full h-[15rem] flex flex-col items-center">
            <div className="flex items-center">
              <ButtonShareMarkers />
              <HeaderAndLogo />
            </div>
            {/* Current marker counter*/}
            <div
              className={`text-2xl -mt-2 text-slate-200 text-center body-font ${
                mapArray.length >= 0 && sharedMarkers.length === 0 ? "animation-tags-header-mobile" : "hidden"
              }`}
            >
              {mapArray.length !== 0 ? "" : "Click on the map to tag trash"}
            </div>
            {/* Marker buttons container*/}
            <div
              className={`button-container-1 body-font w-full overflow-x-hidden text-sm rounded-sm button-container-color ${
                mapArray.length >= 0 && sharedMarkers.length === 0 ? "hidden" : "visible"
              }`}
            >
              {!isSharedLink
                ? mapArray.map((names, index) => (
                    <ButtonsEditDelete
                      key={index}
                      info={index + 1 + ": " + names}
                      index={index}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  ))
                : sharedMarkers.map((marker, index) => (
                    <ButtonsEditDelete
                      key={index}
                      info={`${index + 1}: ${marker.markerInformation}`}
                      index={index}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`animation-tags-header text-2xl my-auto py-5 text-slate-200 text-center body-font ${
              mapArray.length === 0 ? "" : "no-animation"
            }`}
          >
            {!isSharedLink &&
              (mapArray.length !== 0 ? `Current tags: ${markerIndex - 1}` : "Click on map to tag trash")}
          </div>
          <div className="button-container-2 mx-auto gap-3 max-w-[45rem] pt-10 ">
            <div className="button-container-1 maps overflow-x-hidden text-1xl rounded-sm button-container-color max-h-[20rem] mx-5 text-slate-200">
              {!isSharedLink
                ? mapArray.map((names, index) => (
                    <ButtonsEditDelete
                      key={index}
                      info={index + 1 + ": " + names}
                      index={index}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  ))
                : sharedMarkers.map((marker, index) => (
                    <ButtonsEditDelete
                      key={index}
                      info={`${index + 1}: ${marker.markerInformation}`}
                      index={index}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ButtonsMarker;

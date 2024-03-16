import React from "react";
import EditAndDeleteButtonActions from "./EditAndDeleteButtonActions";
import { useSharedState } from "../SharedContext.jsx";

function ButtonsForSavedTags({ mapArray, markerIndex, handleEditClick, handleDeleteClick }) {
  // eslint-disable-next-line no-unused-vars
  const { isMobile, setIsMobile } = useSharedState();
  return (
    <>
      {isMobile ? (
        <>
          <div className="button-container-2 background-color overflow-hidden mx-auto gap-2 p-2 w-full h-[15rem] flex flex-col items-center">
            <div className="flex">
              {/* Share button */}
              <button
                className={`send-button  pointer-events-none  ${
                  mapArray.length === 0 ? "hidden" : "visible"
                } text-xs px-2 text-center my-auto py-2 rounded-sm share-button-mobile`}
              >
                Share your tags!
              </button>
              {/* TrashTaggerLogo */}
              {mapArray.length === 0 ? (
                <div className="logo flex mt-12 mr-3">
                  <img src="./icon3.png" alt="" style={{ height: "80px", width: "80px" }} />
                  <div className="header-font text-[3.8rem] mt-1 text-slate-200">TrashTagger</div>
                </div>
              ) : (
                <div className="logo flex">
                  <img
                    src="./icon3.png"
                    alt=""
                    style={{ height: "50px", width: "50px", marginLeft: "15px", marginRight: "-2px" }}
                  />
                  <div className="my-auto pt-2 header-font text-center text-3xl text-slate-200">TrashTagger</div>
                </div>
              )}
            </div>
            {/* Current tags / Click map */}
            <div
              className={`header-mobile text-2xl -mt-1 text-slate-200 text-center body-font ${
                mapArray.length === 0 ? "animation-tags-header-mobile" : "hidden"
              }`}
            >
              {mapArray.length !== 0 ? `Current tags: ${markerIndex - 1}` : "Click on the map to tag trash"}
            </div>
            {/* Tag buttons container*/}
            <div
              className={`button-container-1 body-font w-full overflow-x-hidden text-sm rounded-sm button-container-color ${
                mapArray.length === 0 ? "hidden" : "visible"
              }`}
            >
              {mapArray.map((names, i) => (
                <EditAndDeleteButtonActions
                  key={i}
                  info={i + 1 + ": " + names}
                  index={i}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div
            className={`animation-tags-header text-2xl my-auto py-5 text-slate-200 text-center body-font ${
              mapArray.length === 0 ? "" : "no-animation"
            }`}
          >
            {mapArray.length !== 0 ? `Current tags: ${markerIndex - 1}` : "Click on map to tag trash"}
          </div>
          <div className="button-container-2 mx-auto gap-3 max-w-[45rem] pt-10 ">
            <div className="button-container-1 maps overflow-x-hidden text-1xl rounded-sm button-container-color max-h-[20rem] mx-5 text-slate-200">
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
      )}
    </>
  );
}

export default ButtonsForSavedTags;

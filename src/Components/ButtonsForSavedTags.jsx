import React from "react";
import EditAndDeleteButtonActions from "./EditAndDeleteButtonActions";
import { isMobile } from "./MainPage";

function ButtonsForSavedTags({ mapArray, markerIndex, handleEditClick, handleDeleteClick }) {
  return (
    <>
      {isMobile ? (
        <>
          <div className="button-container-2 py-3 mx-auto bg-slate-700 gap-2 p-3 w-full h-[15rem] flex flex-col items-center">
            <div className="flex ">
              <button
                className={`send-button ${
                  mapArray.length === 0 ? "hidden" : "visible"
                } text-xs px-2 text-center my-auto py-2 rounded-sm bg-slate-700 text-slate-200`}
              >
                Share your tags!
              </button>
              <div className="logo flex">
                <img
                  src="./icon3.png"
                  alt=""
                  style={{ height: "50px", width: "50px", marginLeft: "15px", marginRight: "-2px" }}
                />
                <div className="bg-[#6cd3a500] my-auto pt-2 header-font text-center text-3xl text-slate-200">
                  TrashTagger
                </div>
              </div>
            </div>
            <div
              className={`header-mobile text-2xl my-auto text-slate-200 text-center body-font ${
                mapArray.length === 0 ? "animation-tags-header " : "hidden"
              }`}
            >
              {mapArray.length !== 0 ? `Current tags: ${markerIndex - 1}` : "Click on map to tag trash"}
            </div>
            <div
              className={`button-container-1 body-font  w-full maps overflow-x-hidden text-sm rounded-sm bg-[#272b37] text-slate-200 ${
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
            <div className="button-container-1 maps overflow-x-hidden text-1xl rounded-[5px] bg-[#272b37] max-h-[20rem] mx-5 text-slate-200">
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

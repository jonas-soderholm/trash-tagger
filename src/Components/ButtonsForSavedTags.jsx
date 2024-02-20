import React from "react";
import { useEffect, useState } from "react";
import EditAndDeleteButtonActions from "./EditAndDeleteButtonActions";
import { isMobile } from "./MainPage";

function ButtonsForSavedTags({ mapArray, markerIndex, handleEditClick, handleDeleteClick }) {
  return (
    <>
      {isMobile ? (
        <>
          <div className="button-container-2 mx-auto bg-[#312f39] gap-2 p-2 w-full h-[14rem] flex flex-col items-center">
            <div className="flex">
              <button
                className={`send-button ${
                  mapArray.length === 0 ? "hidden" : " visible"
                } text-sm px-5 text-center my-auto py-3 rounded-full bg-[#4250c8] text-slate-200`}
              >
                Share your tags!
              </button>
              <img src="./icon2.png" alt="" style={{ height: "50px", width: "60px" }} />
              <div className="bg-[#6cd3a500] text-center text-xl mt-3 text-slate-200">TrashTagger</div>
            </div>
            <div
              className={`HeaderMobile text-2xl my-auto text-slate-200 text-center ${
                mapArray.length === 0 ? "" : "hidden"
              }`}
            >
              {mapArray.length !== 0 ? `Current tags: ${markerIndex - 1}` : "Click on map to tag trash"}
            </div>
            <div
              className={`button-container-1 w-full maps overflow-x-hidden text-sm rounded-[45px] bg-[#5d5a5a] mx-5 max-h-[24rem] text-slate-200 ${
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
          <div className="Header bg-[#cd3a3a00] text-2xl pt-5 px-10 text-slate-200 text-center">
            {mapArray.length !== 0 ? `Current tags: ${markerIndex - 1}` : "Click on map to tag trash"}
          </div>
          <div className="button-container-2 mx-auto bg-[#a98c3600] rounded-lg gap-3 max-w-[45rem] pt-10 ">
            <div className="button-container-1 maps overflow-x-hidden text-1xl rounded-[45px] bg-[#5d5a5a] max-h-[20rem] mx-5 text-slate-200">
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

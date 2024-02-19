import React from "react";
import EditAndDeleteButtonActions from "./EditAndDeleteButtonActions";

function ButtonsForSavedTags({ mapArray, markerIndex, handleEditClick, handleDeleteClick }) {
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

export default ButtonsForSavedTags;

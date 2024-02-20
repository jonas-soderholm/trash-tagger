import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { isMobile } from "./MainPage";

const EditAndDeleteButtonActions = React.memo(({ info, index, handleEditClick, handleDeleteClick }) => {
  return (
    <>
      {isMobile ? (
        <>
          <div className="button flex flex-col justify-between cursor-pointer gap-2 m-3 p-3 bg-[#7d7d86] relative">
            <div className={`button-${index} flex-1 break-words mr-20`}>{info}</div>
            <div className="icons flex gap-4 text-lg absolute top-1/2 transform -translate-y-1/2 right-4">
              <div className="rounded-lg p-1 flex items-center justify-center">
                <div
                  className="edit-icon hover:text-slate-900 pointer-events-auto"
                  onClick={() => handleEditClick(index)}
                >
                  <FaEdit />
                </div>
              </div>
              <div
                className="trash-can-icon rounded-lg p-1 flex items-center justify-center"
                onClick={() => handleDeleteClick(info, index)}
              >
                <div className="hover:text-slate-900 pointer-events-auto">
                  <FaTrash />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="button flex flex-col justify-between cursor-pointer gap-2 m-4 p-3 bg-[#7d7d86] rounded-sm relative">
            <div className={`button-${index} flex-1 break-words mr-20`}>{info}</div>
            <div className="icons flex gap-4 text-lg absolute mt-[3px] transform right-4">
              <div className="rounded-lg">
                <div
                  className="edit-icon hover:text-slate-700 pointer-events-auto"
                  onClick={() => handleEditClick(index)}
                >
                  <FaEdit />
                </div>
              </div>
              <div className="trash-can-icon" onClick={() => handleDeleteClick(info, index)}>
                <div className="hover:text-slate-700 pointer-events-auto">
                  <FaTrash />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
});

export default EditAndDeleteButtonActions;

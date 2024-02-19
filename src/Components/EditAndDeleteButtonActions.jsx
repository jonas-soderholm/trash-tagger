import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const EditAndDeleteButtonActions = React.memo(({ info, index, handleEditClick, handleDeleteClick }) => {
  return (
    <div className="button flex flex-col justify-between cursor-pointer gap-2 m-4 p-3 bg-[#888686] rounded-[2rem] relative">
      <div className={`button-${index} flex-1 break-words mr-20`}>{info}</div>
      <div className="icons flex gap-4 text-xl absolute mt-4 transform -translate-y-1/2 right-4">
        <div className="rounded-lg p-1">
          <div className="edit-icon hover:text-slate-900 pointer-events-auto" onClick={() => handleEditClick(index)}>
            <FaEdit />
          </div>
        </div>
        <div className="trash-can-icon rounded-lg p-1" onClick={() => handleDeleteClick(info, index)}>
          <div className="hover:text-slate-900 pointer-events-auto">
            <FaTrash />
          </div>
        </div>
      </div>
    </div>
  );
});

export default EditAndDeleteButtonActions;

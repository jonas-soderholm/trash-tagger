import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useSharedState } from "../../SharedContext.jsx";

const ButtonsEditDelete = React.memo(({ info, index, handleEditClick, handleDeleteClick }) => {
  const { isMobile } = useSharedState();
  const { isSharedLink } = useSharedState();

  return (
    <>
      {isMobile ? (
        <>
          {/* Info about markers on buttons */}
          <div className="button flex flex-col rounded-sm justify-between cursor-pointer gap-2 m-3 p-3 tag-button-colors relative">
            <div className={`button-${index} flex-1 break-words mr-20`}>{info}</div>
            {/* No edit or delete button for shared links */}
            {!isSharedLink && (
              <div className="icons flex gap-4 text-lg absolute top-1/2 transform -translate-y-1/2 right-4">
                <div className="rounded-lg p-1 flex items-center justify-center">
                  <div className="edit-icon pointer-events-auto" onClick={() => handleEditClick(index)}>
                    <FaEdit />
                  </div>
                </div>
                <div
                  className="trash-can-icon rounded-lg p-1 flex items-center justify-center"
                  onClick={() => handleDeleteClick(info, index)}
                >
                  <div className="pointer-events-auto">
                    <FaTrash />
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Info about markers on buttons */}
          <div className="button flex flex-col justify-between cursor-pointer gap-2 m-4 p-3 tag-button-colors rounded-sm relative">
            <div className={`button-${index} flex-1 break-words mr-20`}>{info}</div>
            {/* No edit or delete button for shared links */}
            {!isSharedLink && (
              <>
                <div className="icons flex gap-4 text-lg absolute mt-[3px] transform right-4">
                  <div className="rounded-lg">
                    <div
                      className="edit-icon hover:text-gray-600 pointer-events-auto"
                      onClick={() => handleEditClick(index)}
                    >
                      <FaEdit />
                    </div>
                  </div>
                  <div className="trash-can-icon" onClick={() => handleDeleteClick(info, index)}>
                    <div className="hover:text-gray-600 pointer-events-auto">
                      <FaTrash />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
});

export default ButtonsEditDelete;

import React, { useRef, useEffect, useState } from "react";
import { useSharedState } from "../../SharedContext.jsx";

const Modal = ({ isOpen, onClose, onSubmit, content, setContent }) => {
  const { isMobile } = useSharedState();
  const inputRef = useRef(null);
  const [contenter, setContenter] = useState("");

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setContenter(content);
  }, [isOpen, content]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      style={{ zIndex: 10000 }}
    >
      <div
        className="relative top-20 mx-auto p-5 border md:w-96 w-[90vw] shadow-lg rounded-md bg-white"
        style={{ zIndex: 10001 }}
      >
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 body-font font-medium text-gray-700">Trash Information</h3>
          <div className="mt-2">
            <form onSubmit={onSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="mt-2 mb-4 px-4 py-2 border rounded-md w-full body-font focus:border-slate-400 outline-none"
                placeholder="Enter marker text..."
                value={contenter} // Use 'contenter' for input value
                onChange={(e) => {
                  setContenter(e.target.value);
                  setContent(e.target.value);
                }}
                maxLength={isMobile ? 100 : 200}
              />
              <button
                type="submit"
                className={`${
                  contenter.trim() ? "bg-[#2b59ef]" : "bg-[#c5cce3]"
                } inline-flex body-font justify-center rounded-md border border-transparent 
share-button py-2 px-4 text-sm font-medium text-white shadow-sm`}
              >
                Submit
              </button>
              <button
                type="button"
                className="ml-2 body-font inline-flex justify-center rounded-md border px-4 py-2 bg-white text-sm 
                font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-gray-500"
                onClick={onClose}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

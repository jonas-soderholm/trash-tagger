import React from "react";
import axios from "axios";
import { useSharedState } from "../SharedContext.jsx";

function ShareMarkersButton() {
  const { sharedMarkers } = useSharedState();

  const handleClick = async () => {};

  return (
    <div className="flex justify-center">
      <button
        className="send-button body-font text-xl bg-opacity-50 backdrop-blur-xl flex px-5 py-4 rounded-full fixed mb-10 p4 hover:bg-slate-500 share-button bottom-2 mx-auto"
        onClick={handleClick}
      >
        Share your tags!
      </button>
    </div>
  );
}

export default ShareMarkersButton;

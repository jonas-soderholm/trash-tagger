import React from "react";

function ShareTagsButton() {
  return (
    <div className="flex justify-center ">
      <button className="send-button pointer-events-none body-font text-xl bg-opacity-50 backdrop-blur-xl flex px-5 py-4 rounded-full fixed mb-10 p4 hover:bg-slate-500 share-button bottom-2 mx-auto">
        Share your tags!
      </button>
    </div>
  );
}

export default ShareTagsButton;

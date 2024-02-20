import React from "react";

function ShareTagsButton() {
  return (
    <div className="flex justify-center ">
      <button className="send-button text-xl bg-opacity-50 backdrop-blur-xl flex px-5 py-4 rounded-full fixed mb-10 p4 hover:bg-slate-500 bg-[#7d7d86] text-slate-200 bottom-2 mx-auto">
        Share your tags!
      </button>
    </div>
  );
}

export default ShareTagsButton;

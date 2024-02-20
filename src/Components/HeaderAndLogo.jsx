import React from "react";
import { isMobile } from "./MainPage";

function HeaderAndLogo() {
  return (
    <>
      {isMobile ? (
        <>{/* Located in ButtonsForSavedTags */}</>
      ) : (
        <>
          {" "}
          <div className="w-[10vw] justify-center mx-auto my-auto pt-4">
            <img src="./icon3.png" alt="" />
          </div>
          <div className="Header header-font bg-[#6cd3a500] text-center text-[6vw] text-slate-200">TrashTagger</div>
        </>
      )}
    </>
  );
}

export default HeaderAndLogo;

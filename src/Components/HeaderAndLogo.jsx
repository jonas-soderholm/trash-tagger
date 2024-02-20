import React from "react";
import { useSharedState } from "../SharedContext.jsx";

function HeaderAndLogo() {
  // eslint-disable-next-line no-unused-vars
  const { isMobile, setIsMobile } = useSharedState();
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
          <div className="Header header-font text-center text-[6vw] text-slate-200">TrashTagger</div>
        </>
      )}
    </>
  );
}

export default HeaderAndLogo;

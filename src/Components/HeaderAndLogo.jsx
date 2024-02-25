import React from "react";
import { useSharedState } from "../SharedContext.jsx";

function HeaderAndLogo() {
  // eslint-disable-next-line no-unused-vars
  const { isMobile, setIsMobile } = useSharedState();
  const { mapArray, setMapArray } = useSharedState();
  const { isSharedLink, setIsSharedLink } = useSharedState();
  const { sharedMarkers, setSharedMarkers } = useSharedState();

  return (
    <>
      {isMobile ? (
        <>
          {mapArray.length >= 0 && sharedMarkers.length === 0 ? (
            <div className="logo flex mt-8 mr-3">
              <img src="./icon3.png" alt="" style={{ height: "80px", width: "80px" }} />
              <div className="header-font text-[3.8rem] mt-1 text-slate-200">TrashTagger</div>
            </div>
          ) : (
            <>
              <div className="logo flex">
                <img
                  src="./icon3.png"
                  alt=""
                  style={{ height: "50px", width: "50px", marginLeft: "15px", marginRight: "-2px" }}
                />
                <div className="my-auto pt-2 header-font text-center text-3xl text-slate-200">TrashTagger</div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          <div className="w-[8vw] justify-center mx-auto my-auto pt-4">
            <img src="./icon3.png" alt="" />
          </div>
          <div className="Header header-font text-center text-[6vw] text-slate-200">TrashTagger</div>
        </>
      )}
    </>
  );
}

export default HeaderAndLogo;

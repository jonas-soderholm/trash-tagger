import React from "react";
import { useSharedState } from "../../SharedContext.jsx";

function HeaderAndLogo() {
  const { isMobile } = useSharedState();
  const { mapArray } = useSharedState();
  const { sharedMarkers } = useSharedState();

  return (
    <>
      {isMobile ? (
        <>
          {mapArray.length >= 0 && sharedMarkers.length === 0 ? (
            <div className="logo flex items-center  mt-8 mr-3">
              <img
                src="./logo.png"
                className="flex items-center translate-y-[-0.5rem] justify-center"
                alt=""
                style={{ height: "80px", width: "80px" }}
              />
              <div className="concert-one-regular flex items-center text-[2rem] mt-2 text-slate-200">MapTagger.</div>
            </div>
          ) : (
            <>
              <div className="logo flex">
                <img
                  src="./logo.png"
                  alt=""
                  style={{ height: "50px", width: "50px", marginLeft: "15px", marginRight: "-2px" }}
                />
                <div className="my-auto pt-[1.1rem] concert-one-regular  text-center text-2xl text-slate-200">
                  MapTagger.
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          <div className="w-[8vw] justify-center mx-auto my-auto pt-4">
            <img src="./logo.png" alt="" />
          </div>
          <div className="concert-one-regular mt-8 text-center text-[4vw] text-slate-200">MapTagger.</div>
        </>
      )}
    </>
  );
}

export default HeaderAndLogo;

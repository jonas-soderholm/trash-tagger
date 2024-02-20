import React from "react";
import { isMobile } from "./MainPage";

function HeaderAndLogo() {
  return (
    <>
      {isMobile ? (
        <>
          {" "}
          <div className="flex w-[10vw] justify-center mx-auto pt-5">
            <img src="./icon2.png" alt="" />
            <div className="Header bg-[#6cd3a500] text-center text-[3vw] text-slate-200 pt-5">TrashTagger</div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="w-[10vw] justify-center mx-auto pt-5">
            <img src="./icon2.png" alt="" />
          </div>
          <div className="Header bg-[#6cd3a500] text-center text-[3vw] text-slate-200 pt-5">TrashTagger</div>
        </>
      )}
    </>
  );
}

export default HeaderAndLogo;

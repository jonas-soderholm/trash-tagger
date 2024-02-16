import { useState } from "react";

function YourMaps() {
  return <></>;
}

function MapButtonClick() {
  return console.log("TagMap");
}

function Buttons({ info }) {
  return (
    <div className=" cursor-pointer m-4 p-2 text-center bg-cyan-700 rounded-lg" onClick={() => MapButtonClick()}>
      {info}
    </div>
  );
}

function MainPage() {
  const [mapChosen, SetMapChosen] = useState(true);
  const mapArray = ["map1", "map2"];
  const tagArray = ["tag1", "tag2", "tag3"];

  function MapAndTagContiner() {
    return (
      <>
        <div className="Header text-slate-200 text-center text-[2vw] mt-6 p-4">Your Tags on map: Upplands Väsby</div>
        <div className="map-container mx-auto bg-slate-900 rounded-lg gap-3 shadow-xl max-w-xl">
          <div className="maps overflow-x-hidden md:max-h-[30vh] max-h-[17vh] rounded-lg bg-slate-800 justify-center overflow-scroll">
            {mapChosen
              ? mapArray.map((names, i) => <Buttons info={names} />)
              : tagArray.map((names, i) => <Buttons info={names} />)}
          </div>
        </div>
      </>
    );
  }

  function CreateNewMapClick() {
    SetMapChosen(!mapChosen);
    console.log(mapChosen);
  }

  return (
    <>
      <div className="main-container md:flex md:flex-row  bg-[#795c5c] m-[2vh] rounded-lg h-[96vh] gap-4">
        <div className="left-part md:w-1/3 bg-slate-700 rounded-lg">
          <div className="Header text-slate-200 text-center text-[3vw] mt-6">TrashTagger</div>
          <MapAndTagContiner />
          <div
            className="cursor-pointer m-4  p-2 text-center bg-green-700 rounded-lg"
            onClick={() => CreateNewMapClick()}
          >
            Create new map
          </div>
        </div>
        <div className="right-part md:w-2/3 bg-slate-700 rounded-lg"></div>
      </div>
    </>
  );
}

export default MainPage;

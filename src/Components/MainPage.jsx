import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Map from "./Map";
import React, { useMemo } from "react";
import { DeleteMarker } from "./Map";
import { map, marker } from "leaflet";
import { useSharedState } from "../MarkerStateContext.jsx";

function MapButtonClick(index) {}

function MainPage() {
  const [mapArray, setMapArray] = useState([]);
  const [currentMap, setCurrentMap] = useState("asdasd");
  const [inputValue, setInputValue] = useState("Click on map to add marker");
  const center = useMemo(() => [59.5099648, 17.8847744], []);
  const zoom = useMemo(() => 13, []);
  const { markers, updateValue } = useSharedState();
  const { markerIndex, updateMarkerIndex } = useSharedState();

  function CreateTagInfoClick(index, info) {
    setCurrentMap(index);

    setMapArray((prevMapArray) => [...prevMapArray, index + ": " + info]);
    setInputValue(index);
  }

  function RemoveButton(_, index) {
    const newArray = [...mapArray];
    newArray.splice(index, 1);
    setMapArray(newArray);
    console.log(markers + " DELETE " + marker.length);
    DeleteMarker(markers, updateValue, index);

    updateMarkerIndex(newArray.length + 1);

    updateMarkersAfterRemoval(index);

    function updateMarkersAfterRemoval(removedIndex) {
      for (let i = 0; i <= 6; i++) {
        const markerDiv = document.getElementById(`marker-${i}`);
        if (markerDiv) {
          const currentMarkerNumber = parseInt(markerDiv.id.replace("marker-", ""), 10);

          if (currentMarkerNumber > removedIndex) {
            markerDiv.textContent = currentMarkerNumber - 1;
            markerDiv.id = `marker-${currentMarkerNumber - 1}`;
          }
        }
      }
    }
  }

  function CreateButtonsAndHeader() {
    return (
      <>
        <div className="Header bg-[#cd3a3a00] text-2xl pt-10 px-10 text-slate-200 text-center">
          {mapArray.length !== 0 ? `Current area: ${currentMap}` : "Click on map"}
        </div>
        <div className="button-container-2 mx-auto bg-[#a98c3600] rounded-lg gap-3  max-w-[45rem] pt-10 ">
          <div className="button-container-1 maps overflow-x-hidden text-2xl rounded-[45px] bg-[#5d5a5a] max-h-[25rem] mx-5 text-slate-200">
            {mapArray.map((names, i) => (
              <ButtonStyle info={i + 1 + ":"} index={i} />
            ))}
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    console.log("mapArray updated:", mapArray);
  }, [mapArray]);

  function textInputChange(event) {
    setInputValue(event.target.value);
  }

  // Define a callback function to pass to Map
  function handleCreateButtonsAndHeader(index, info) {
    console.log("Run CreateTagInfoClick");
    CreateTagInfoClick(index, info);
  }

  function ButtonStyle({ info, index }) {
    return (
      <div
        className="button flex justify-between hover:bg-slate-500 cursor-pointer gap-2
         m-4 p-3 bg-[#888686] rounded-[2rem]"
        style={{ position: "relative" }}
        onClick={() => MapButtonClick(index)}
      >
        {info}
        <div className="icons flex gap-4 text-xl items-center">
          <div className="rounded-lg p-1">
            <div className="edit-icon hover:text-slate-900 pointer-events-auto">
              <FaEdit />
            </div>
          </div>
          <div
            className="trash-can-icon rounded-lg p-1"
            onClick={() => {
              RemoveButton(info, index);
            }}
          >
            <div className="hover:text-slate-900 pointer-events-auto">
              <FaTrash />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="main-container md:flex md:flex-row  bg-[#46664200] m-[2vh] rounded-lg h-[96vh] gap-4">
        <div className="left-part md:w-1/3 bg-slate-700 rounded-lg">
          <div className="Header bg-[#6cd3a500] text-center text-[3vw] text-slate-200 pt-10">TrashTagger</div>
          <div className="input flex items-center justify-center pt-10 gap-4"></div>
          <CreateButtonsAndHeader />
        </div>
        <div className="right-part md:w-2/3 bg-slate-500 rounded-lg">
          <Map center={center} zoom={zoom} onAddMark={handleCreateButtonsAndHeader} />
        </div>
      </div>
    </>
  );
}

export default MainPage;
//www.google.com/maps/@59.5099648,17.8847744,14z?entry=ttu

{
  /* <input
maxLength={50}
type="text"
placeholder="Enter new area name"
value={inputValue}
onChange={textInputChange} //
className=" p-2 border border-gray-300 rounded-lg focus:outline-none overflow-hidden"
/>
<button
className="create-button p-[9px] text-center bg-[#888888] rounded-lg text-white focus:outline-none"
onClick={() => CreateTagInfoClick()}
>
Add
</button> */
}

https: {
  /* <div className="nav-container flex justify-center bg-[#df860a] max-w-min m-auto rounded-full px-4">
<div className="visualNav flex gap-3 m-4 bg-[#538e33]">
  <div className="text-[3vw] bg-[#454fda]">
    <FaTrash />
  </div>
  <div className="text-[3vw] bg-[#454fda]">
    <FaEdit />
  </div>
</div>
</div> */
}

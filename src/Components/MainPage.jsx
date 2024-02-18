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

    setMapArray((prevMapArray) => [...prevMapArray, info]);
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
        <div className="Header bg-[#cd3a3a00] text-2xl pt-5 px-10 text-slate-200 text-center">
          {mapArray.length !== 0 ? `Current tags: ${markerIndex - 1}` : "Click on map to tag trash"}
        </div>
        <div className="button-container-2 mx-auto bg-[#a98c3600] rounded-lg gap-3  max-w-[45rem] pt-10 ">
          <div className="button-container-1 maps overflow-x-hidden text-2xl rounded-[45px] bg-[#5d5a5a] max-h-[20rem] mx-5 text-slate-200">
            {mapArray.map((names, i) => (
              <ButtonStyle info={i + 1 + ": " + names} index={i} />
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
        className="button flex flex-col justify-between hover:bg-slate-500 cursor-pointer gap-2 m-4 p-3 bg-[#888686] rounded-[2rem] relative"
        onClick={() => MapButtonClick(index)}
      >
        <div className="text-container flex-1 break-words mr-20">{info}</div>

        <div className="icons flex gap-4 text-xl absolute mt-4  transform -translate-y-1/2 right-4">
          <div className="rounded-lg p-1">
            <div className="edit-icon hover:text-slate-900 pointer-events-auto">
              <FaEdit />
            </div>
          </div>
          <div className="trash-can-icon  rounded-lg p-1" onClick={() => RemoveButton(info, index)}>
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
        <div className="left-part md:w-1/3 bg-slate-700 rounded-lg ">
          <div className="w-[10vw] justify-center mx-auto pt-5">
            <img src="./icon2.png" alt="" />
          </div>
          <div className="Header bg-[#6cd3a500] text-center text-[3vw] text-slate-200 pt-5">TrashTagger</div>
          <div className="input flex items-center justify-center pt-5 gap-4"></div>
          <CreateButtonsAndHeader />
          <div className="flex justify-center ">
            <button className="send-button text-xl bg-opacity-50 backdrop-blur-xl flex px-5 py-4  rounded-full fixed mb-10 p4 hover:bg-slate-500 bg-[#888686]  text-slate-200 bottom-2 mx-auto">
              Share your tags!
            </button>
          </div>
        </div>

        <div className="right-part md:w-2/3 bg-slate-500 rounded-lg">
          <Map center={center} zoom={zoom} onAddMark={handleCreateButtonsAndHeader} />
        </div>
      </div>
    </>
  );
}

export default MainPage;

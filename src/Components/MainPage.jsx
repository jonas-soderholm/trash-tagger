import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function MapButtonClick(index) {
  return console.log(index);
}

function MainPage() {
  const [mapArray, setMapArray] = useState([]);
  const [currentMap, setCurrentMap] = useState("asdasd");
  const [inputValue, setInputValue] = useState("");

  function CreateNewMapClick() {
    setCurrentMap(inputValue);

    if (mapArray.length < 5 && inputValue !== "") {
      const newMap = mapArray.length === 0 ? "newMap" : currentMap;
      setMapArray((prevMapArray) => [...prevMapArray, inputValue]);
      setInputValue("");
    } else {
      console.log("Map full or no text");
    }
  }

  function handleChange(event) {
    setInputValue(event.target.value); // Update input value as user types
  }

  function MapButtons() {
    return (
      <>
        <div className="Header bg-[#cd3a3a00] text-2xl pt-10 px-10 text-slate-200 text-center">
          {mapArray.length !== 0 ? `Map: ${currentMap}` : <span style={{ visibility: "hidden" }}>Hidden</span>}
        </div>
        <div className="map-container mx-auto bg-[#625ed000] rounded-lg gap-3  max-w-[45rem] pt-10 ">
          <div className="maps overflow-x-hidden text-2xl rounded-lg bg-[#2a2a2a] max-h-[25rem] mx-5 text-slate-200">
            {mapArray.map((names, i) => (
              <Buttons info={names} index={i} />
            ))}
          </div>
        </div>
      </>
    );
  }

  function RemoveMap(index) {
    const newArray = [...mapArray]; // Create a copy of the array
    newArray.splice(index, 1); // Remove one element at the specified index
    setMapArray(newArray); // Update state with the modified array
    console.log(index + " DELETE");
  }

  function Buttons({ info, index }) {
    return (
      <div
        className="button flex justify-between hover:bg-slate-500 cursor-pointer gap-2 m-4 p-3 bg-cyan-700 rounded-lg"
        style={{ position: "relative" }}
        onClick={() => MapButtonClick(index)}
      >
        {info}
        <div className="icons flex gap-4 text-xl items-center">
          <div className="rounded-lg p-1">
            <div className="hover:text-slate-900 pointer-events-auto">
              <FaEdit />
            </div>
          </div>
          <div className="rounded-lg p-1" onClick={() => RemoveMap(index)}>
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
          <div className="flex items-center justify-center pt-10 gap-4">
            <input
              maxLength={50}
              type="text"
              placeholder="Enter map name"
              value={inputValue}
              onChange={handleChange} //
              className=" p-2 border border-gray-300 rounded-lg focus:outline-none overflow-hidden"
            />
            {/* Add first click start */}
            <button
              className="p-2 text-center bg-cyan-700 rounded-lg text-white focus:outline-none"
              onClick={() => CreateNewMapClick()}
            >
              Add
            </button>
          </div>
          <MapButtons />
        </div>
        <div className="right-part md:w-2/3 bg-slate-700 rounded-lg"></div>
      </div>
    </>
  );
}

export default MainPage;

{
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

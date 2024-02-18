import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MainPage from "./MainPage";
import { useSharedState } from "../MarkerStateContext.jsx";

export function DeleteMarker(markers, setMarker, index) {
  markers[index].remove();

  // Create a new array without the removed marker
  const updatedMarkers = markers.filter((_, markerIndex) => markerIndex !== index);

  // Update the shared state with the updated markers array
  setMarker(updatedMarkers);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Map = React.memo(({ center, zoom, onAddMark }) => {
  const mapRef = useRef(null);
  const containerId = useRef(`map-${Date.now()}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const { markerIndex, updateMarkerIndex } = useSharedState();
  const { markers, updateValue } = useSharedState();
  const maxMarkers = 11;
  const inputRef = useRef(null); // Reference to the input field

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      // Set focus to the input field when the modal opens
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!mapRef.current && document.getElementById(containerId.current)) {
      mapRef.current = L.map(containerId.current).setView(center, zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      mapRef.current.on("click", function (e) {
        updateMarkerIndex((prevIndex) => {
          if (prevIndex < maxMarkers) {
            setIsModalOpen(true);
          }
          setMarkerPosition(e.latlng);
          return prevIndex;
        });
      });
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.off("click");
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // console.log(markers.length); // Log the current value of markers.length
  }, [markers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (markerPosition) {
      const newIndex = markerIndex + 1;
      updateMarkerIndex(newIndex);

      if (onAddMark) {
        onAddMark(markerIndex, modalContent);
      }

      const randomColor = getRandomColor();

      const newMarker = L.marker([markerPosition.lat, markerPosition.lng], {
        icon: L.divIcon({
          className: "my-custom-marker",
          html: `<div id="marker-${markerIndex}" style="text-align: center; color: #e5e7eb; background-color: rgb(51 65 85);;
          padding: 0px; font-size: 25px; border-radius: 40px;">${markerIndex}</div>`,
          iconSize: [80, 80],
          iconAnchor: [40, 40],
          popupAnchor: [0, -40],
        }),
      }).addTo(mapRef.current);

      updateValue((prevMarkers) => {
        const updatedMarkers = [...prevMarkers, newMarker];
        console.log(updatedMarkers); // Log updated markers

        return updatedMarkers;
      });
      handleCloseModal();
      setModalContent("");
    }
  };

  return (
    <>
      <div id={containerId.current} style={{ height: "100%", width: "100%" }}></div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          style={{ zIndex: 10000 }}
        >
          <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            style={{ zIndex: 10001 }}
          >
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Trash information</h3>
              <div className="mt-2">
                <form onSubmit={handleSubmit}>
                  <input
                    ref={inputRef} // Attach the ref to the input field
                    type="text"
                    className="mt-2 mb-4 px-4 py-2 border rounded-md w-full"
                    placeholder="Enter marker text..."
                    value={modalContent}
                    onChange={(e) => setModalContent(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="ml-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Map;

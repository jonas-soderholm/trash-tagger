import React, { useState, useEffect, useRef } from "react";
import L, { marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import MainPage from "./MainPage";
import { useMarkers } from "./MarkersContext";

export function DeleteMarker() {
  //markers[0].remove();
  console.log("fda");
}

const Map = React.memo(({ center, zoom, onAddMark }) => {
  const mapRef = useRef(null);
  const containerId = useRef(`map-${Date.now()}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [markerIndex, setMarkerIndex] = useState(1);
  const [markers, setMarkers] = useState([]);
  //const { markers, setMarkers } = useMarkers();

  const maxMarkers = 6;

  useEffect(() => {
    if (!mapRef.current && document.getElementById(containerId.current)) {
      mapRef.current = L.map(containerId.current).setView(center, zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      const customIcon = L.icon({
        iconUrl: "/location.png",
        iconSize: [80, 80],
        iconAnchor: [40, 40],
        popupAnchor: [0, -40],
      });

      mapRef.current.on("click", function (e) {
        setMarkerIndex((prevIndex) => {
          if (prevIndex < maxMarkers) {
            setIsModalOpen(true);
          }
          setMarkerPosition(e.latlng);
          console.log(mapRef.current);
          return prevIndex; // Return the current value to keep it unchanged
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
    console.log(markers.length); // Log the current value of markers.length
  }, [markers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (markerPosition) {
      const newIndex = markerIndex + 1;
      setMarkerIndex(newIndex);

      if (onAddMark) {
        onAddMark(markerIndex, modalContent);
      }

      const newMarker = L.marker([markerPosition.lat, markerPosition.lng], {
        icon: L.divIcon({
          className: "my-custom-marker",
          html: `<div style="text-align: center; background-color: white; color: black;
             padding: 0px; font-size: 25px; border-radius: 40px;">${markerIndex}</div>`,
          iconSize: [80, 80],
          iconAnchor: [40, 40],
          popupAnchor: [0, -40],
        }),
      })
        .addTo(mapRef.current)
        .on("click", (e) => e.target.remove());

      setMarkers((prevMarkers) => {
        const updatedMarkers = [...prevMarkers, newMarker];
        console.log(updatedMarkers); // Log updated markers

        return updatedMarkers;
      });
      //marker.bindPopup(modalContent).openPopup();
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

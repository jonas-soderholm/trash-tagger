import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSharedState } from "../../SharedContext.jsx";
import Modal from "../modal/Modal.jsx";

export const maxAmmountOfTags = 11;

export function DeleteMarker(markers, setMarker, index) {
  if (index >= 0 && index < markers.length) {
    markers[index].remove();
    const updatedMarkers = markers.filter((_, markerIndex) => markerIndex !== index);
    setMarker(updatedMarkers);
  }
}

export function createNewSharableMarker(_, lat, long, info) {
  return { id: 0, latitude: lat, longitude: long, info: info };
}

const Map = React.memo(({ onAddMark }) => {
  // eslint-disable-next-line no-unused-vars
  const { markers, setMarkers } = useSharedState();
  const mapRef = useRef(null);
  const containerId = useRef(`map-${Date.now()}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const { markerIndex, setMarkerIndex } = useSharedState();
  const { sharedMarkers, setSharedMarkers } = useSharedState();
  // eslint-disable-next-line no-unused-vars
  const { newSharingObject, setNewSharingObject } = useSharedState();
  const { isSharedLink } = useSharedState();
  const { markersLoaded } = useSharedState();
  const { isLoggedIn } = useSharedState();
  // eslint-disable-next-line no-unused-vars
  const [center, setCenter] = useState([0, 0]);
  const zoom = 15;
  const inputRef = useRef(null);

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current && document.getElementById(containerId.current)) {
      mapRef.current = L.map(containerId.current);
      mapRef.current.setView([0, 0], 3);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      if (!isSharedLink && markersLoaded) {
        const successCallback = (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([latitude, longitude]);
          mapRef.current.setView([latitude, longitude], zoom);
        };

        mapRef.current.on("locationerror", function (e) {
          console.error("Location error:", e.message);
        });

        const errorCallback = (error) => {
          console.error("Location error:", error.message);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { timeout: 20000 });
      } else if (isSharedLink && sharedMarkers.length > 0) {
        const latitude = sharedMarkers[0].latitude;
        const longitude = sharedMarkers[0].longitude;
        const userLocation = [latitude, longitude];
        setCenter(userLocation);
        mapRef.current.setView(userLocation, zoom);
      }

      // User clicks on map
      if (!isSharedLink) {
        mapRef.current.on("click", function (e) {
          setMarkerIndex((prevIndex) => {
            if (prevIndex < maxAmmountOfTags) {
              setIsModalOpen(true);
            }
            setMarkerPosition(e.latlng);

            return prevIndex;
          });
        });
      }

      // // Add a marker for the shared location
      if (isSharedLink && mapRef.current) {
        sharedMarkers.forEach((marker, i) => {
          const markerHtml = `<div id="marker-${i + 1}" style="display: flex; justify-content: center; align-items:
            center; color: #e5e7eb; opacity: 92%; background: linear-gradient(0deg, rgb(33, 33, 33), rgb(79, 79, 79)); padding: 30px;
             font-size: 23px; border-radius: 100%; height: 100%; width: 100%; transform:
             translateX(${-20}px) translateY(${-20}px);">${i + 1}</div>`;
          L.marker([marker.latitude, marker.longitude], {
            icon: L.divIcon({
              className: "background-color my-custom-marker body-font",
              html: markerHtml,
            }),
          }).addTo(mapRef.current);
        });
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off("click");
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [zoom, setMarkerIndex, isSharedLink, markersLoaded, isLoggedIn]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  // Handle user click on map
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!modalContent.trim()) {
      console.log("Content is empty, not submitting.");
      return;
    }

    if (markerPosition) {
      const newIndex = markerIndex + 1;
      setMarkerIndex(newIndex);

      if (onAddMark) {
        onAddMark(markerIndex, modalContent);
      }

      const newMarker = L.marker([markerPosition.lat, markerPosition.lng], {
        icon: L.divIcon({
          className: "background-color my-custom-marker body-font",
          html: `<div id="marker-${markerIndex}" style="display: flex; justify-content: center; align-items: 
          center; color: #e5e7eb; background: linear-gradient(0deg, rgb(33, 33, 33), rgb(79, 79, 79)); padding: 30px;
           font-size: 23px; border-radius: 100%; opacity: 92%; height: 100%; width: 100%; transform: 
           translateX(${-20}px) translateY(${-20}px);">${markerIndex}</div>`,
        }),
      }).addTo(mapRef.current);

      setMarkers((prevMarkers) => {
        const updatedMarkers = [...prevMarkers, newMarker];
        return updatedMarkers;
      });

      setModalContent(modalContent);

      // Sharing object DB
      const newShareTemp = createNewSharableMarker(0, markerPosition.lat, markerPosition.lng, modalContent);
      setNewSharingObject(newShareTemp);
      setSharedMarkers((prevSharedMarkers) => [...prevSharedMarkers, newShareTemp]);

      handleCloseModal();
    }
  };

  return (
    <>
      {/* Map */}
      <div className=" md:rounded-xl" id={containerId.current} style={{ height: "95.7vh", width: "100%" }}></div>
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        content={modalContent}
        setContent={setModalContent}
      />
    </>
  );
});

export default Map;

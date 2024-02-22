import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSharedState } from "../SharedContext.jsx";
import Modal from "./Modal.jsx";

export const maxAmmountOfTags = 11;

export function DeleteMarker(markers, setMarker, index) {
  if (index >= 0 && index < markers.length) {
    markers[index].remove();
    const updatedMarkers = markers.filter((_, markerIndex) => markerIndex !== index);
    setMarker(updatedMarkers);
  }
}

export function createNewSharableMarker(markerId, lat, long, info) {
  return { markerId: markerId, latitude: lat, longitude: long, info: info };
}

const Map = React.memo(({ onAddMark }) => {
  const { markers, setMarkers } = useSharedState();
  const mapRef = useRef(null);
  const containerId = useRef(`map-${Date.now()}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [markerPosition, setMarkerPosition] = useState(null);
  const { markerIndex, setMarkerIndex } = useSharedState();
  const { sharedMarkers, setSharedMarkers } = useSharedState();
  const { newSharingObject, setNewSharingObject } = useSharedState();
  const [center, setCenter] = useState([0, 0]);
  const zoom = 15;
  const inputRef = useRef(null);

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!mapRef.current && document.getElementById(containerId.current)) {
      mapRef.current = L.map(containerId.current);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Add a marker for the current location
      //mapRef.current.locate({ setView: true, maxZoom: 16 });

      // mapRef.current.on("locationfound", function (e) {
      //   const { lat, lng } = e.latlng;
      //   const userLocation = [59.5099648, 17.8847744];
      //   setCenter(userLocation);
      //   const userLatLng = L.latLng(59.5099648, 17.8847744);
      //   mapRef.current.setView(userLocation, zoom);
      // });

      // Testing purpose only removes check my location
      const userLatLng = L.latLng(59.5099648, 17.8847744);
      mapRef.current.setView(userLatLng, zoom);
      ///////

      mapRef.current.on("click", function (e) {
        setMarkerIndex((prevIndex) => {
          if (prevIndex < maxAmmountOfTags) {
            setIsModalOpen(true);
          }
          setMarkerPosition(e.latlng);

          return prevIndex;
        });
      });

      // // Add a marker for the shared location
      // if (sharedMarkers && sharedMarkers.length > 0 && mapRef.current) {
      //   sharedMarkers.forEach((marker, i) => {
      //     const { latitude, longitude, tagInformation } = marker;
      //     const markerHtml = `<div id="marker-${i + 1}" style="display: flex; justify-content: center; align-items:
      //     center; color: #e5e7eb; background-color: rgb(51 65 85); padding: 30px;
      //      font-size: 23px; border-radius: 100%; height: 100%; width: 100%; transform:
      //      translateX(${-20}px) translateY(${-20}px);">${i + 1}</div>`;
      //     L.marker([latitude, longitude], {
      //       icon: L.divIcon({
      //         className: "",
      //         html: markerHtml,
      //       }),
      //     }).addTo(mapRef.current);
      //   });
      // }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off("click");
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [zoom, setMarkerIndex]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

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
          className: "my-custom-marker body-font",
          html: `<div id="marker-${markerIndex}" style="display: flex; justify-content: center; align-items: 
          center; color: #e5e7eb; background-color: rgb(51 65 85); padding: 30px;
           font-size: 23px; border-radius: 100%; height: 100%; width: 100%; transform: 
           translateX(${-20}px) translateY(${-20}px);">${markerIndex}</div>`,
        }),
      }).addTo(mapRef.current);

      setMarkers((prevMarkers) => {
        const updatedMarkers = [...prevMarkers, newMarker];
        return updatedMarkers;
      });

      setModalContent(modalContent);

      // Sharing object DB
      setNewSharingObject(createNewSharableMarker(newIndex, markerPosition.lat, markerPosition.lng, modalContent));
      setSharedMarkers((prevSharedMarkers) => [...prevSharedMarkers, newSharingObject]);

      handleCloseModal();
    }
  };

  return (
    <>
      <div id={containerId.current} style={{ height: "100vh", width: "100%" }}></div>
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

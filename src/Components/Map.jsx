import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = React.memo(({ center, zoom }) => {
  const mapRef = useRef(null);
  const containerId = useRef(`map-${Date.now()}`); // Generate a unique ID
  const lastMarkerRef = useRef(null);
  useEffect(() => {
    if (!mapRef.current && document.getElementById(containerId.current)) {
      // Initialize the map
      mapRef.current = L.map(containerId.current).setView(center, zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Define a custom icon
      const trashCanIcon = L.icon({
        iconUrl: "/location.png", // Path to your icon image
        iconSize: [80, 80], // Size of the icon
        iconAnchor: [40, 40], // Point of the icon which should correspond to marker's location
        popupAnchor: [0, -40], // Point from which the popup should open relative to the iconAnchor
      });

      // Function to generate custom popup content
      function getPopupContent(e) {
        // Example of dynamically generating content based on the click location

        const prom = prompt();
        const lat = e.latlng.lat.toFixed(2);
        const lng = e.latlng.lng.toFixed(2);
        return prom;
      }

      // Add click event listener to the map for adding markers
      mapRef.current.on("click", function (e) {
        const marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: trashCanIcon });
        marker.addTo(mapRef.current);
        marker.bindPopup(getPopupContent(e)).openPopup();
      });
    }

    return () => {
      // Cleanup the map and remove the event listener
      if (mapRef.current) {
        mapRef.current.off("click"); // Remove click event listener
        mapRef.current.remove(); // Remove the map
        mapRef.current = null;
      }
    };
  }, [center, zoom]); // Dependencies array

  return <div id={containerId.current} style={{ height: "100%", width: "100%" }}></div>;
});

export default Map;

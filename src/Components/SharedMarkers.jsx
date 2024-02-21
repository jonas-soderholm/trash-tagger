import React, { useEffect } from "react";
import L from "leaflet";

const SharedMarkerPage = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const markerId = queryParams.get("markerId");
    const lat = parseFloat(queryParams.get("lat"));
    const lng = parseFloat(queryParams.get("lng"));

    const fetchMarkerInformation = async () => {
      // Fetch marker information from server based on markerId
      // ...
    };

    const renderMarker = async () => {
      const markerData = await fetchMarkerInformation();
      if (markerData) {
        // Create map and render marker
        const map = L.map("map").setView([lat, lng], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);
        L.marker([lat, lng]).addTo(map);
      }
    };

    renderMarker();
  }, []);

  return <div id="map" style={{ height: "100vh" }}></div>;
};

export default SharedMarkerPage;

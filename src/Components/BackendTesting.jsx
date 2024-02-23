import React from "react";
import { useSharedState } from "../SharedContext.jsx";

function BackendTesting() {
  const { sharedMarkers, setSharedMarkers } = useSharedState();

  const fetchMarkerInformation = async () => {
    try {
      const response = await fetch("http://localhost:3100/MarkerInformation");
      if (!response.ok) {
        // This will catch HTTP errors like 500 Internal Server Error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("MarkerInformation:", data);
    } catch (error) {
      console.error("Error fetching MarkerInformation:", error);
    }
  };

  const sendMarkerData = async () => {
    try {
      const response = await fetch("http://localhost:3100/MarkerInformation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sharedMarkers),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Marker data sent successfully");
    } catch (error) {
      console.error("Error sending marker data:", error);
    }
  };

  return (
    <>
      <div>
        <button className=" w-52" onClick={fetchMarkerInformation}>
          Fetch TagInformation
        </button>
        <button className=" w-52" onClick={sendMarkerData}>
          Send Marker
        </button>
      </div>
    </>
  );
}

export default BackendTesting;

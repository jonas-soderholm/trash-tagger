import React, { useEffect } from "react";
import { useSharedState } from "../SharedContext.jsx";
import { v4 as uuidv4 } from "uuid";

function BackendTesting() {
  const { sharedMarkers, setSharedMarkers } = useSharedState();
  const { isSharedLink, setIsSharedLink } = useSharedState();

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
    const uuidMarkers = uuidv4(); // Generate a unique identifier for the markers

    // Generate updated markers array with the same groupId for all markers
    const updatedUuidMarkers = sharedMarkers.map((marker, index) => ({
      ...marker,
      groupId: uuidMarkers,
    }));

    console.log(uuidMarkers);

    try {
      const response = await fetch("http://localhost:3100/MarkerInformation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUuidMarkers),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Marker data sent successfully");

      // Construct the sharable link with the groupId
      const shareableLink = `http://localhost:3000/shared-markers?groupId=${uuidMarkers}`;
      console.log("Shareable link:", shareableLink);
    } catch (error) {
      console.error("Error sending marker data:", error);
    }
  };

  // Function to fetch group markers
  const fetchGroupMarkers = async (groupId) => {
    const url = `http://localhost:3100/shared-markers?groupId=${groupId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Group Markers Data:", data);
      setSharedMarkers(data);
      setIsSharedLink(true);

      // Here you would typically update your state with the fetched data
      // setSharedMarkers(data.markers); // Assuming data.markers is the array of markers
    } catch (error) {
      console.error("Error fetching group markers:", error);
    }
  };

  // useEffect hook to check URL for groupId and fetch group markers if present
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const groupId = queryParams.get("groupId");

    if (groupId) {
      fetchGroupMarkers(groupId);
    }
  }, []);

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

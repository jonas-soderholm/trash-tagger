import React, { useEffect } from "react";
import { useSharedState } from "../SharedContext.jsx";
import { v4 as uuidv4 } from "uuid";

function ButtonShareMarkers() {
  const { sharedMarkers, setSharedMarkers } = useSharedState();
  const { isSharedLink, setIsSharedLink } = useSharedState();
  const { markersLoaded, setMarkersLoaded } = useSharedState();

  // Send markers and generate new sharable link based on those
  const sendMarkerData = async () => {
    const uuidMarkers = uuidv4();

    const updatedUuidMarkers = sharedMarkers.map((marker, index) => ({
      ...marker,
      groupId: uuidMarkers,
    }));

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
      setMarkersLoaded(true);
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
    } else {
      setMarkersLoaded(true);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <button
          className="send-button body-font text-xl bg-opacity-50 backdrop-blur-xl flex px-5 py-4 rounded-full fixed mb-10 p4 hover:bg-slate-500 share-button bottom-2 mx-auto"
          onClick={sendMarkerData}
        >
          Share your tags!
        </button>
      </div>
    </>
  );
}

export default ButtonShareMarkers;
